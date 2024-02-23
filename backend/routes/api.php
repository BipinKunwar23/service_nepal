<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SubCategoryController;
use App\Http\Controllers\Admin\SubServiceController;

use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\Buyer\BuyerCatalogController;
use App\Http\Controllers\Buyer\BuyerOrderController;
use App\Http\Controllers\Buyer\BuyerServiceController;
use App\Http\Controllers\Buyer\FilterSearchController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\ProfessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RequirementsController;
use App\Http\Controllers\ScopeUserController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\Seller\SellerFeedbackController;
use App\Http\Controllers\Seller\SellerOrderController;
use App\Http\Controllers\Seller\SellerProfileController;
use App\Http\Controllers\Seller\SellerServiceController;
use App\Http\Controllers\ServiceProviderController;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('user')->controller(UserController::class)->group(function () {
    Route::post('/create', 'create');
    Route::middleware('auth:sanctum')->get('/get', [UserController::class, 'get']);
    Route::post('/login', 'login');
    Route::get('/view', 'viewAll');
    Route::get('/view/{userId}', 'viewById');
    Route::put('/update/{user}', 'update');
    Route::delete('/delete/{userId}', 'delete');
    Route::get('/profile/auth/{userId}', 'providerAuth');
});

Route::prefix('provider')->controller(LandingPageController::class)->group(function () {

    Route::post('stories/{userId}/create', 'successStoreis');
    Route::post('questions/{userId}/create', 'askquestions');
    Route::post('about/create', 'aboutUs');
    Route::post('contact/create', 'contactUs');
    Route::post('header/create', 'headers');
    Route::post('legal/create', 'legals');

    Route::get('stories/{userId}/get', 'getSuccessStoreis');
    Route::get('questions/{userId}/get', 'getAskquestions');
    Route::get('about/get', 'getAboutUs');
    Route::get('contact/get', 'getcontactUs');
    Route::get('header/get', 'getHeaders');
    Route::get('legal/get', 'getlegals');
});

Route::prefix('profile')->middleware('auth:sanctum')->controller(ProfileController::class)->group(function () {

    // Route::middleware('auth:sanctum')->get('/get',[UserController::class,'get']);

    Route::get('/view', 'viewProfile');
    Route::post('/create', 'create');
    Route::post('/security', 'addSecurity');

    Route::delete('/delete/{profile}', 'delete');
});

Broadcast::routes(['middleware' => ['auth:sanctum']]);
Route::prefix('chat')->controller(ChatController::class)->group(function () {

    // Route::get('chat/get',[ChatController::class,'sendMessage'])->middleware('auth:sanctum')
    Route::get('private/{receiverId}', [ChatController::class, 'index'])->middleware('auth:sanctum');
    Route::post('private/{receiverId}', [ChatController::class, 'store'])->middleware('auth:sanctum');
});



Route::prefix('admin')->group(function () {

    Route::prefix('category')->controller(CategoryController::class)->group(function () {
        Route::post('create', 'create');
        Route::get('all', 'getAllCategory');
        Route::get('view/{id}', 'viewCategoryById');
        Route::post('edit/{id}', 'updateCategory');
    });

    Route::prefix('subcategory')->controller(SubCategoryController::class)->group(function () {
        Route::post('create/{categoryId}', 'create');
        Route::get('all', 'getAllSubCategory');
        Route::get('view/category/{categoryId}', 'getSubCategoryByCategory');
        Route::get('view/{id}', 'getById');
        Route::put('edit/{id}', 'updateSubCategory');
    });

    Route::prefix('services')->controller(ServiceController::class)->group(function () {
        Route::post('create/{id}', 'create');
        Route::get('all', 'getAll');
        Route::get('view/subcategory/{subcategoryId}', 'getBySubcategory');
        Route::get('view/{id}', 'viewById');
        Route::post('edit/{service}', 'updateService');
    });

    Route::prefix('subservice')->controller(SubServiceController::class)->group(function () {

        Route::post('create/{serviceId}', 'create');
        Route::get('all', 'show');
        Route::get('service/{serviceId}', 'showByServiceId');
    });
});




Route::prefix('buyer')->group(function () {

    Route::prefix('catalog')->controller(BuyerCatalogController::class)->group(function () {
        Route::get('show', 'viewCatalog');
    });

    Route::prefix('services')->controller(BuyerServiceController::class)->group(function () {
        Route::get('cards/all', 'getAllServiceCards');
        Route::get('view/{serviceId}', 'getServiceDetails');
    });

    Route::prefix('filter')->controller(FilterSearchController::class)->group(function () {
        Route::get('service', 'searchService');
        Route::get('location/get', 'searchLocation');
        Route::get('location/provider', 'searchByLocation');
        Route::get('location/category/{categoryId}', 'searchCategoryLocation');
        Route::get('provider/keyword', 'searchProviderByService');
        Route::get('service/{serviceId}/filter', 'filterService');
        Route::get('service/filters/{serviceId}', 'getFilterTypes');
    });

    Route::prefix('orders')->controller(BuyerOrderController::class)->group(function () {
        Route::post('service/{serviceId}/seller/{sellerId}', 'placeOrder');
        Route::get('view/{orderId}', 'viewOrder');
        Route::get('buyer/{buyerId}', 'getBuyerOrders');
    });
});




Route::prefix('seller')->middleware('auth:sanctum')->group(function () {

    Route::prefix('catalog')->controller(CategoryController::class)->group(function () {
        Route::get('category', 'viewCategory');
        Route::get('subcategory', 'viewSubCategory');
        Route::get('service', 'viewService');
        Route::get('subservice', 'viewSubService');
        Route::get('subservice/{serviceId}', 'getSubserviceByService');
    });

    Route::prefix('service')->controller(SellerServiceController::class)->group(function () {
        Route::post('overview', 'createOverView');
        Route::post('price', 'createPrice');
        Route::post('gallery', 'createGallery');
        Route::post('faq', 'createFaq');
        Route::post('requirement', 'createRequirement');

        Route::get('service/draft', 'DraftServiceCard');
        Route::get('service/active', 'ActiveService');
        Route::get('service/{serviceId}', 'getServiceDetails');
    });
    Route::prefix('profile')->controller(SellerProfileController::class)->group(function () {
        Route::post('personal', 'createPersonal');
        Route::post('profession', 'createProfession');
        Route::post('availability', 'createAvailability');
        Route::post('security', 'createSecurity');
    });

    Route::prefix('orders')->controller(SellerOrderController::class)->group(function () {
        Route::get('all', 'getReceivedOrders');
        Route::get('view/{orderId}', 'viewOrderReceived');
        Route::put('{orderId}/accept', 'AcceptOrder');
        Route::put('{orderId}/cancel', 'CancelOrder');
    });
    Route::prefix('provider')->controller(SellerFeedbackController::class)->group(function () {

        Route::post('rating/{providerId}', 'rateServiceProvider');
        Route::post('review/{providerId}', 'reviewServiceProvider');
        Route::get('{providerId}/feedback/{subcategoryId}', 'getAllFeedback');
        Route::get('{providerId}/category/{categoryId}/rating', 'calculateOverallRating');
    });
});
