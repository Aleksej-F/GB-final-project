<?php

namespace App\Providers;

use App\Filters\CategoryFilter;
use App\Filters\TagFilter;
use Domain\Information\Filters\FilterManager;
use Illuminate\Support\ServiceProvider;

class InformationServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(FilterManager::class);
    }

    public function boot(): void
    {
        app(FilterManager::class)->registerFilters([
            new CategoryFilter(),
            new TagFilter(),
        ]);
    }
}
