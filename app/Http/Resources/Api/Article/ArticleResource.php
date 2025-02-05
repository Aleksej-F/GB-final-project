<?php

namespace App\Http\Resources\Api\Article;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'user_name' => $this->user->nickName,
            'views' => $this->views,
            'count_comments' => $this->comments()->count(),
            'created_at' => "{$this->setDate($this)} в {$this->created_at->format('h:m')}",
        ];
    }
}
