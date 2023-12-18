<?php

use App\Http\Controllers\AgreementController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CusotmerProviderController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderScopeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProviderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\QualificationController;
use App\Http\Controllers\ScopeController;
use App\Http\Controllers\ScopeUserController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceProviderController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\SubCategoryController;
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
    Route::post('/login', 'login');
    Route::middleware('auth:sanctum')->get('/get', [UserController::class, 'get']);
    Route::get('/view', 'viewAll');
    Route::get('/view/{user}', 'viewById');
    Route::put('/update/{user}', 'update');
    Route::delete('/delete/{user}', 'delete');
    Route::get('/profile/auth/{id}', 'providerAuth');
});
Route::prefix('profile')->controller(ProfileController::class)->group(function () {

    // Route::middleware('auth:sanctum')->get('/get',[UserController::class,'get']);

    Route::get('/view/{id}', 'viewProfile');
    Route::post('/edit/{id}', 'createOrUpdate');
    Route::delete('/delete/{profile}', 'delete');
});

Route::prefix('qualification')->controller(QualificationController::class)->group(function () {
    Route::post('/create/{id}', 'create');
    Route::get('/view/{qualification}', 'view');
    Route::put('/update/{qualification}', 'update');
    Route::delete('/dele{te/{qualification}', 'delete');
});
Route::prefix('category')->controller(CategoryController::class)->group(function () {
    Route::post('create', 'category');
    Route::get('view', 'viewCategory');
    Route::get('view/{id}', 'viewCategoryById');
    Route::get('search', 'search');
    Route::get('services/{id}', 'getCategoryById');
    Route::get('service/{id}', 'getServices');
    Route::get('All/{id}', 'getAllCategory');
    Route::get('provider/{id}', 'getCategoryByProviderId');
    Route::post('edit/{id}', 'updateCategory');
});
Route::prefix('subcategory')->controller(SubCategoryController::class)->group(function () {
    Route::post('create/{id}', 'create');
    Route::get('viewAll', 'getAll');
    Route::get('view/{id}', 'getById');
    Route::get('view/detail/{id}', 'viewSubCategoryById');
    Route::get('provider/{providerId}/category/{categoryId}', 'getSubCategoryByProviderCategoryId');
    Route::get('provider/{providerId}', 'getSubCategoryByProviderId');
    Route::put('edit/{id}', 'updateSubCategory');
});

Route::prefix('services')->controller(ServiceController::class)->group(function () {
    Route::post('create/{id}', 'create');
    Route::get('all', 'getAll');
    Route::get('{id}', 'getById');
    Route::get('view/{id}', 'viewServiceById');
    Route::get('category/{id}', 'getByCategory');
    Route::post('edit/{service}', 'updateService');
});

Route::prefix('provider')->controller(ServiceProviderController::class)->group(function () {
    Route::post('services/create/{id}', 'createServices');
    Route::get('{providerId}/services', 'getServicesByPorviderId');
    Route::get('{providerId}/category/{categoryId}', 'getServicesByCategory');
    Route::get('{providerId}/subcategory/{subcategoryid}', 'getServicesBySubCategory');
    Route::post('services/update/{providerId}', 'editProviderService');
    Route::delete('{providerId}/delete/{serviceId}', 'deleteServiceByServiceId');
    Route::get('{providerId}/services/{serviceId}', 'getServiceById');
    Route::get('{providerId}/service/{serviceId}/view', 'viewProviderServicesById');

    Route::get('{providerId}/{serviceId}/scope', 'getProviderServiceScope');



    Route::get('all', 'getAllProvider');
    Route::get('category/{categoryId}', 'getProviderByCategory');
    Route::get('subcategory/{subcategoryid}', 'getProviderBySubCategory');
    Route::get('{providerId}/details', 'getProviderDetails');

    Route::get('search/service', 'searchByService');
});

Route::prefix('orders')->controller(OrderController::class)->group(function () {
    Route::post('create/{customerId}/service/{serviceId}/provider/{providerId}', 'placeOrder');
    Route::get('provider/{providerId}', 'getReceivedOrders');
    Route::get('{orderId}/received', 'viewOrderReceived');
    Route::get('{orderId}/made', 'viewCustomerOrder');


    Route::get('customer/{customerId}', 'getCustomerOrders');

    Route::put('{orderId}/accept', 'AcceptOrder');
    Route::put('{orderId}/cancel', 'CancelOrder');
    // Route::get('get/{providerId}', 'getAllOrders');
    // Route::get('{orderId}/{customerId}', 'getOrdersById');
});

Route::prefix('search')->controller(SearchController::class)->group(function () {

    Route::get('service', 'searchService');
    Route::get('location/get', 'searchLocation');
    Route::get('location/provider', 'searchByLocation');
    Route::get('location/category/{categoryId}', 'searchCategoryLocation');
});


Route::prefix('scope')->controller(ScopeController::class)->group(function () {

    Route::post('create/{serviceId}', 'create');
    Route::get('all', 'show');
    Route::get('service/{serviceId}', 'showByServiceId');
});

Route::prefix('scope/provider')->controller(ScopeUserController::class)->group(function () {

    Route::post('create/{providerId}', 'create');
    Route::get('show/{providerId}/{servcieId}', 'getProviderScope');
});

Route::prefix('order/scope')->controller(OrderScopeController::class)->group(function () {

    Route::post('create/{orderId}', 'create');
    Route::get('show/{orderId}/{providerId}', 'showByProviderOrder');
});

Route::prefix('order/agreement')->controller(AgreementController::class)->group(function () {

    Route::post('initial/{orderId}', 'initialAgreement');
    Route::post('final/{orderId}', 'finalAgreement');
    Route::get('check/initial/{orderId}', 'viewInitialAgreement');
    Route::get('check/final/{orderId}', 'viewFinalAgreement');
    Route::put('{orderId}/accept', 'AcceptAgreement');

});

Route::prefix('status')->controller(StatusController::class)->group(function () {

    Route::post('order/{orderId}/accept', 'AcceptOrder');
    Route::post('order/{orderId}/cancel', 'CancelOrder');
    Route::get('check/initial/{orderId}', 'viewInitialAgreement');
    Route::get('check/final/{orderId}', 'viewFinalAgreement');
});
