<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\OptionsController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\ServiceTypeController;
use App\Http\Controllers\Admin\StandardController;
use App\Http\Controllers\Admin\SubCategoryController;
use App\Http\Controllers\Admin\UserController as AdminUserController;

use App\Http\Controllers\Admin\SubServiceController;
use App\Http\Controllers\Admin\SubsubcateogryController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\Buyer\BuyerCatalogController;
use App\Http\Controllers\Buyer\BuyerFeedbackController;
use App\Http\Controllers\Buyer\BuyerOrderController;
use App\Http\Controllers\Buyer\BuyerServiceController;
use App\Http\Controllers\Buyer\FilterSearchController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PriceController;
use App\Http\Controllers\ProfessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RequirementsController;
use App\Http\Controllers\ScopeUserController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SearchHistoryController;
use App\Http\Controllers\Seller\OrderStatusController;
use App\Http\Controllers\Seller\SellerCatalogController;
use App\Http\Controllers\Seller\SellerFeedbackController;
use App\Http\Controllers\Seller\SellerOrderController;
use App\Http\Controllers\Seller\SellerProfileController;
use App\Http\Controllers\Seller\SellerServiceController;
use App\Http\Controllers\ServiceProviderController;
use App\Http\Controllers\UserServiceController;
use App\Models\SearchHistory;
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


Broadcast::routes(['middleware' => ['auth:sanctum']]);

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


Route::prefix('user/service')->controller(UserServiceController::class)->group(function () {
    Route::get('all', 'getAllServiceCards');
    Route::get('{serviceId}/package', 'getServicePackage');
    Route::get('search/list/{name}', 'getSearchList');
    Route::get('search', 'getSearchedServices');
    Route::get('filter_type/{serviceId}', 'getFilterTypes');
    Route::get('filter/{serviceId}', 'getfilteredService');
    Route::get('{serviceId}/option/{optionId}', 'getServiceDetails');
});


Route::prefix('landing')->controller(LandingPageController::class)->group(function () {

    Route::get('show', 'getLandingPageData');
});

Route::prefix('profile')->middleware('auth:sanctum')->controller(ProfileController::class)->group(function () {

    // Route::middleware('auth:sanctum')->get('/get',[UserController::class,'get']);

    Route::get('view', 'viewProfile');
    Route::post('create', 'create');
    Route::post('security', 'addSecurity');
    Route::post('edit/photo', 'changeProfileImage');
    Route::put('edit/address', 'changeAddress');
    Route::put('edit/phone', 'changePhoneNumber');
    Route::put('edit/bio', 'changeBio');
    Route::put('edit/name', 'changeName');





    Route::delete('/delete/{profile}', 'delete');
});

Route::prefix('chat')->middleware('auth:sanctum')->controller(ChatController::class)->group(function () {

    // Route::get('chat/get',[ChatController::class,'sendMessage'])->middleware('auth:sanctum')
    Route::get('private/all', 'index');
    Route::post('private/{receiverId}', 'store');
    Route::get('private/{receiverId}', 'show');
    Route::delete('private/{receiverId}', 'deleteChat');
});


Route::prefix('notification')->middleware('auth:sanctum')->controller(NotificationController::class)->group(function () {

    // Route::get('chat/get',[ChatController::class,'sendMessage'])->middleware('auth:sanctum')
    Route::post('create', 'createNotificaitons');
    Route::get('all', 'getNotifications');
    Route::get('private/{receiverId}', 'show');
});



Route::prefix('saved')->middleware('auth:sanctum')->controller(ListController::class)->group(function () {

    // Route::get('chat/get',[ChatController::class,'sendMessage'])->middleware('auth:sanctum')
    Route::post('list', 'createList');
    Route::get('list/{serviceId}', 'getList');
    Route::post('favourite/{listId}/service/{serviceId}', 'addtoFavourite');
    Route::post('wishlist/{listId}/service/{serviceId}', 'addtoWishList');
    Route::get('favourite/{listId}', 'getFavouriteList');

    Route::get('wishlist/{listId}', 'getWishList');

    Route::get('services', 'getSavedItems');
    Route::get('list/{id}/service', 'getItemsByList');
});

Route::prefix('history')->middleware('auth:sanctum')->controller(SearchHistoryController::class)->group(function () {

    // Route::get('chat/get',[ChatController::class,'sendMessage'])->middleware('auth:sanctum')
    Route::post('create/{serviceId}', 'createSearchRecord');
    Route::post('update/rating/{searchId}', 'upadatRating');
    Route::post('update/rating/{searchId}', 'updateLocation');
    Route::post('update/rating/{searchId}', 'updateBudget');


    Route::get('view', 'viewUserSearchHistory');
    Route::get('private/{receiverId}', 'show');
});




Route::prefix('admin')->group(function () {

    Route::prefix('category')->controller(CategoryController::class)->group(function () {
        Route::post('create', 'create');
        Route::get('all', 'getAllCategory');
        Route::get('view/{id}', 'viewCategoryById');
        Route::put('edit/{id}', 'updateCategory');
        Route::delete('delete/{id}', 'deleteCategory');
    });

    Route::prefix('subcategory')->controller(SubCategoryController::class)->group(function () {
        Route::post('create/{categoryId}', 'create');
        Route::get('all', 'getAllSubCategory');
        Route::get('view/category/{categoryId}', 'getSubCategoryByCategory');
        Route::get('view/{id}', 'viewById');
        Route::post('edit/{id}', 'updateSubCategory');
    });

    Route::prefix('option')->controller(OptionsController::class)->group(function () {
        Route::post('create/{serviceId}', 'create');
        Route::get('all', 'getAllSubCategory');
        Route::get('service/{serviceId}', 'getByService');
        Route::get('view/{id}', 'getById');
        Route::put('edit/{option}', 'updateOption');
    });


    Route::prefix('standard')->controller(StandardController::class)->group(function () {
        Route::post('create/{serviceId}', 'createStandard');
        Route::put('edit/{standard}', 'updateStandard');


        Route::get('{serviceId}', 'getStandardByServicesId');
        Route::prefix('value')->group(function () {
            Route::post('{standardId}', 'addValues');
            Route::put('edit/{id}', 'updateValue');



            Route::get('{standardId}', 'getValuesByStandard');
        });
    });

    Route::prefix('service')->controller(ServiceController::class)->group(function () {
        Route::post('create/{id}', 'create');
        Route::get('all', 'getAllServices');
        Route::get('view/{id}', 'viewById');
        Route::get('category/{categoryId}', 'getByCategory');
        Route::get('subcategory/{subcategoryId}', 'getBySubCategory');
        Route::post('edit/{service}', 'updateService');
    });
    Route::prefix('user')->controller(AdminUserController::class)->group(function () {
        Route::get('all', 'viewAllUsers');
        Route::get('delete/{id}', 'deleteUser');
        Route::prefix('service')->group(function () {
            Route::get('all', 'viewAllServices');
            Route::post('approve/{id}', 'ApproveService');
            Route::post('modify/{id}', 'requestModification');
            Route::post('deny/{id}', 'denyService');
        });
        Route::prefix('order')->group(function () {
            Route::get('all', 'viewAllOrders');
            Route::post('cancel/{id}', 'cancelOrder');
        });
    });
    Route::prefix('about')->middleware('auth:sanctum')->controller(AboutUsController::class)->group(function () {

        // Route::get('chat/get',[ChatController::class,'sendMessage'])->middleware('auth:sanctum')
        Route::get('company', 'viewCompanyInformation');
        Route::get('teams', 'viewTeams');
        Route::get('testimonial', 'viewTestimonials');
        Route::get('faqs', 'viewFaqs');
        Route::get('legal', 'viewLegalInformation');
        Route::get('all', 'viewAbout');

        Route::post('company', 'addCompanyInformation');
        Route::post('teams', 'addTeams');
        Route::post('testimonial', 'addTestimonials');
        Route::post('faqs', 'addFaqs');
        Route::post('legal', 'addLegalInformation');
        Route::post('company/edit/{company}', 'editCompanyInformation');
        Route::post('teams/edit/{member}', 'editTeams');
        Route::post('testimonial/edit', 'addTestimonials/edit');
        Route::put('faqs/{id}', 'editFaqs');
        Route::put('legal', 'editLegalInformation');
    });
});




Route::prefix('buyer')->middleware('auth:sanctum')->group(function () {

    Route::prefix('catalog')->controller(BuyerCatalogController::class)->group(function () {
        Route::get('show', 'viewCatalog');
    });

    Route::prefix('service')->controller(BuyerServiceController::class)->group(function () {
        Route::get('recommend', 'getRecommendedServices');
        Route::get('popular', 'getPopularService');

        Route::get('all', 'getAllServiceCards');
        Route::get('{serviceId}', 'getServiceDetails');
        Route::get('{serviceId}/package', 'getServicePackage');
        Route::get('order/{serviceId}', 'getSpecificOrderDetails');
    });

    Route::prefix('filter')->controller(FilterSearchController::class)->group(function () {
        Route::get('service', 'searchService');
        Route::get('search/list/{name}', 'getSearchList');
        Route::get('location/provider', 'searchByLocation');
        Route::get('location/category/{categoryId}', 'searchCategoryLocation');
        Route::get('search', 'getSearchedServices');
        Route::get('service/{serviceId}', 'getfilteredService');
        Route::get('types/{serviceId}', 'getFilterTypes');
    });
    Broadcast::routes(['middleware' => ['auth:sanctum']]);


    Route::prefix('order')->controller(BuyerOrderController::class)->group(function () {
        Route::post('service/address', 'saveServiceAddress');
        Route::post('service/{serviceId}', 'placeOrder');
        Route::get('service/address', 'viewServiceAddress');

        Route::get('all', 'getAllOrders');
        Route::get('{orderId}', 'viewOrder');
        Route::put('{orderId}/cancel', 'CancelOrder');
        Route::get('location/{sellerId}', 'viewSellerLocation');
    });

    Route::prefix('review')->controller(BuyerFeedbackController::class)->group(function () {

        Route::post('{sellerId}', 'reviewService');
        Route::get('{sellerId}', 'getReviews');
    });
});




Route::prefix('seller')->middleware('auth:sanctum')->group(function () {

    Route::prefix('catalog')->controller(SellerCatalogController::class)->group(function () {
        Route::get('category', 'viewCategory');
        Route::get('subcategory', 'viewSubCategory');
        Route::get('service', 'viewService');
        Route::get('subservice', 'viewSubService');
        Route::get('subservice/{serviceId}', 'getSubserviceByService');
        Route::get('show', 'viewCatalog');
    });

    Route::prefix('service')->controller(SellerServiceController::class)->group(function () {


        Route::post('overview/{serviceId}', 'createServiceOverView');
        Route::put('overview/{serviceId}', 'updateServiceOverView');


        Route::post('price/{serviceId}', 'createPrice');
        Route::put('price/{serviceId}', 'updatePrice');

        Route::post('detail/create/{serviceId}', 'createSpecificDetails');
        Route::post('detail/update/{serviceId}', 'updateSpecificDetails');

        Route::post('gallery/{serviceId}', 'createGallery');
        Route::post('gallery/update/{serviceId}', 'updateGallery');


        Route::post('requirement/{serviceId}', 'createRequirement');
        Route::put('requirement/{serviceId}', 'updateRequirement');
        Route::get('draft/general/{serviceId}', 'DraftGeneralService');
        Route::get('draft/specific/{serviceId}', 'DraftSpecificService');


        Route::get('view/all', 'viewServiceSummary');

        Route::post('save/{serviceId}', 'saveService');
        Route::get('cards', 'viewServiceCards');

        Route::get('{serviceId}', 'getServiceDetails');

        // Route::prefix('specific')->group(function () {
        //     Route::get('draft/{serviceId}', 'DraftSpecificService');
        //     Route::post('overview/{optionId}', 'createSpecificOverView');
        //     Route::put('overview/{serviceId}', 'updateSpecificOverView');
        //     Route::post('detail/create/{serviceId}', 'createSpecificDetails');
        //     Route::post('detail/update/{serviceId}', 'updateSpecificDetails');
        //     Route::post('save/{serviceId}', 'saveSpecificService');
        //     Route::get('{serviceId}', 'getSpecificServiceDetails');
        // });



        Route::get('option/{optionId}', 'getOptionDetails');

        Route::get('standard/{serviceId}', 'getServiceStandards');
        Route::delete('delete/{id}', 'deleteService');
    });
    Route::prefix('profile')->controller(SellerProfileController::class)->group(function () {
        Route::post('personal', 'createPersonal');
        Route::post('personal/update', 'updatePersonal');


        Route::post('qualification', 'createProfession');
        Route::put('qualification', 'updateProfession');

        Route::post('availability', 'createAvailability');
        Route::put('availability', 'updateAvailability');


        Route::post('faqs/{serviceId}', 'createFaq');
        Route::put('faqs/{serviceId}', 'updateFaq');

        Route::post('security', 'createSecurity');
        Route::post('role', 'setRole');
        Route::get('role', 'getRole');


        Route::get('view', 'viewProfile');
    });

    Route::prefix('order')->controller(SellerOrderController::class)->group(function () {
        Route::get('all', 'getAllReceivedOrders');
        Route::get('location', 'viewOrderLocation');

        Route::get('view/{orderId}', 'viewOrderReceived');
        Route::put('{orderId}/accept', 'AcceptOrder');
        Route::put('{orderId}/cancel', 'CancelOrder');
        Route::put('{orderId}/complete', 'CompleteOrder');
        Route::delete('{orderId}/delete', 'DeleteOrder');


        Route::get('statistic', 'getStatisticData');
        Route::get('donut/city', 'getDonutCityData');
        Route::get('donut/status/{locationId}', 'getDonutStatusData');


        Route::put('status', 'updateStatus');
    });
});
