const express = require("express");
const route = express.Router();
const UserController = require("../../controllers/client/user_controller");
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

//gift item
route.get('/gift-items', GiftItemController.index);

//faq
route.get('/faq', FaqController.index);

//banner
route.get('/banner', BannerController.index);

//ads
route.get('/ads', AdsController.index);

//unit
route.get('/unit', UnitController.index);

//brand
route.get('/brand', BrandController.index);

//category
route.get('/category', CategoryController.index);

//product
route.get('/product', ProductController.index);

//region
route.get('/region', RegionController.index);

//dealer
route.get('/dealer', DealerController.index);

//delivery order
route.get('/delivery-order', DeliveryOrderController.index);

route.post('/user', UserController.update);


module.exports = route;