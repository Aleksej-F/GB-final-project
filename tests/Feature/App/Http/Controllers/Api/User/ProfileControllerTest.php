<?php

namespace Tests\Feature\App\Http\Controllers\Api\User;

use App\Http\Controllers\Api\User\ProfileController;
use Database\Factories\Domain\Information\Models\ArticleFactory;
use Database\Factories\Domain\Information\Models\CategoryFactory;
use Database\Factories\Domain\User\Models\UserFactory;
use Domain\Information\Models\Article;
use Domain\Information\Models\Category;
use Domain\User\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ProfileControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    private function createUser(): User
    {
        return UserFactory::new()->createOne();
    }

    private function createCategory(): Category
    {
        return CategoryFactory::new()
            ->createOne();
    }

    private function createArticle(User $user): Article
    {
        return ArticleFactory::new()
            ->createOne(['user_id' => $user->getKey()]);
    }

    private function getToken(User $user): array
    {
        $token = $user->createToken('auth_token')->plainTextToken;

        return  [
            'Authenticated' => 'Bearer' . $token
        ];
    }

    private function request(Category $category): array
    {
        return [
            'title' => 'Test',
            'description' => 'Test',
            'category_id' => $category->getKey(),
        ];
    }

    public function test_can_user_update_profile(): void
    {
        UserFactory::new()->create([
            'nickName' => 'Test',
            'email' => 'testt@mail.com',
            'password' => '123456'
        ]);

        $this->assertDatabaseHas('users', [
            'nickName' => 'Test',
            'email' => 'testt@mail.com'
        ]);

        $user = User::query()
            ->where('email', 'testt@mail.com')
            ->first();

        $user->update([
            'nickName' => 'Success',
            'firstName' => 'Test',
            'lastName' => 'Testov',
        ]);

        $this->assertDatabaseHas('users', [
            'nickName' => 'Success',
            'firstName' => 'Test'
        ]);
    }

    public function test_can_auth_user_create_article(): void
    {
        $category = $this->createCategory();

        $user = $this->createUser();

        Sanctum::actingAs($user);

        $this->post(action([ProfileController::class, 'createArticle']), $this->request($category), $this->getToken($user))
            ->assertOk();

        $this->assertDatabaseHas('articles', [
            'description' => 'Test',
            'user_id' => $user->getKey()
        ]);
    }

    public function test_it_get_user_articles_success(): void
    {
        $user = $this->createUser();

        Sanctum::actingAs($user);

        ArticleFactory::new()->count(5)
            ->create(['user_id' => $user->getKey()]);

        $this->post(action([ProfileController::class, 'getUserArticles']), $this->getToken($user))
            ->assertOk()
            ->assertJsonCount(1);
    }

    public function test_it_can_user_article_update_success(): void
    {
        $user = $this->createUser();

        Sanctum::actingAs($user);

        $category = $this->createCategory();

        $article = $this->createArticle($user);

        $this->put(action([ProfileController::class, 'update'], $article->getKey()), $this->request($category), $this->getToken($user))
            ->assertOk()
            ->assertJson(['message' => 'Статья успешно обновлена и отправлена на модерацию']);

        $this->assertDatabaseHas('articles', [
            'id' => $article->getKey(),
            'user_id' => $user->getKey(),
            'status' => 0
        ]);
    }

    public function test_it_can_user_article_delete_success(): void
    {
        $user = $this->createUser();

        Sanctum::actingAs($user);

        $article = $this->createArticle($user);

        $this->delete(action([ProfileController::class, 'destroy'], $article->getKey()), $this->getToken($user))
            ->assertOk()
            ->assertJson(['message' => 'Статья успешно удалена']);

        $this->assertDatabaseMissing('articles', [
            'id' => $article->getKey()
        ]);
    }
}
