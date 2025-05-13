const express = require("express");
const route = express.Router();
const AdminController = require("../../controllers/admin/admin_controller");
const GiftItemController = require("../../controllers/admin/gift_item_controller");
const FaqController = require("../../controllers/admin/faq_controller");
const AdsController = require("../../controllers/admin/ads_controller");
const BannerController = require("../../controllers/admin/banner_controller");
const UnitController = require("../../controllers/admin/unit_controller");
const BrandController = require("../../controllers/admin/brand_controller");
const CategoryController = require("../../controllers/admin/category_controller");
const ProductController = require("../../controllers/admin/product_controller");
const RegionController = require("../../controllers/admin/region_controller");
const DealerController = require("../../controllers/admin/dealer_controller");
const DeliveryOrderController = require("../../controllers/admin/delivery_order_controller");

//admin
route.get('/admin', AdminController.index);
route.post('/admin', AdminController.create);
route.get('/admin/:id', AdminController.edit);
route.put('/admin', AdminController.update);
route.delete('/admin', AdminController.delete);
route.post('/upload-admin-profile', AdminController.upload.single('profile'), AdminController.uploadImage);

//gift item
route.get('/gift-items', GiftItemController.index);
route.post('/gift-items', GiftItemController.create);
route.get('/gift-items/:id', GiftItemController.edit);
route.put('/gift-items', GiftItemController.update);
route.delete('/gift-items', GiftItemController.delete);
route.post('/upload-gift-image', GiftItemController.upload.single('gift_item'), GiftItemController.uploadImage);

//faq
route.get('/faq', FaqController.index);
route.post('/faq', FaqController.create);
route.get('/faq/:id', FaqController.edit);
route.put('/faq', FaqController.update);
route.delete('/faq', FaqController.delete);

//banner
route.get('/banner', BannerController.index);
route.post('/banner', BannerController.create);
route.get('/banner/:id', BannerController.edit);
route.put('/banner', BannerController.update);
route.delete('/banner', BannerController.delete);
route.post('/upload-banner', BannerController.upload.single('banner'), BannerController.uploadImage);

//ads
route.get('/ads', AdsController.index);
route.post('/ads', AdsController.create);
route.get('/ads/:id', AdsController.edit);
route.put('/ads', AdsController.update);
route.delete('/ads', AdsController.delete);
route.post('/upload-ads', AdsController.upload.single('ads'), AdsController.uploadImage);

//unit
route.get('/unit', UnitController.index);
route.post('/unit', UnitController.create);
route.get('/unit/:id', UnitController.edit);
route.put('/unit', UnitController.update);
route.delete('/unit', UnitController.delete);

//brand
route.get('/brand', BrandController.index);
route.post('/brand', BrandController.create);
route.get('/brand/:id', BrandController.edit);
route.put('/brand', BrandController.update);
route.delete('/brand', BrandController.delete);

//category
route.get('/category', CategoryController.index);
route.post('/category', CategoryController.create);
route.get('/category/:id', CategoryController.edit);
route.put('/category', CategoryController.update);
route.delete('/category', CategoryController.delete);

//product
route.get('/product', ProductController.index);
route.post('/product', ProductController.create);
route.get('/product/:id', ProductController.edit);
route.put('/product', ProductController.update);
route.delete('/product', ProductController.delete);

//region
route.get('/region', RegionController.index);
route.post('/region', RegionController.create);
route.get('/region/:id', RegionController.edit);
route.put('/region', RegionController.update);
route.delete('/region', RegionController.delete);

//dealer
route.get('/dealer', DealerController.index);
route.post('/dealer', DealerController.create);
route.get('/dealer/:id', DealerController.edit);
route.put('/dealer', DealerController.update);
route.delete('/dealer', DealerController.delete);

//delivery order
route.get('/delivery_order', DeliveryOrderController.index);
route.post('/delivery_order', DeliveryOrderController.create);
route.get('/delivery_order/:id', DeliveryOrderController.edit);
route.put('/delivery_order', DeliveryOrderController.update);
route.delete('/delivery_order', DeliveryOrderController.delete);

module.exports = route;