<?php

if (isset($_GET['clear_all_caches_secret_123'])) {
    $files = [
        __DIR__ . '/../bootstrap/cache/routes-v7.php',
        __DIR__ . '/../bootstrap/cache/config.php',
        __DIR__ . '/../bootstrap/cache/services.php',
        __DIR__ . '/../bootstrap/cache/packages.php',
    ];
    foreach ($files as $file) {
        if (file_exists($file)) {
            @unlink($file);
            echo "Deleted cache file: $file<br>";
        }
    }
    echo "Caches cleared successfully!";
    exit;
}

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
