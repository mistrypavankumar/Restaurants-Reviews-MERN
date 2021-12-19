// All routers are includes here
const express = require("express");
const RestaurantsCtrl = require("./restaurants.controller.js");
const ReviewsCtrl = require("./reviews.controller.js");

const router = express.Router();

// Initial route
router.route("/").get(RestaurantsCtrl.apiGetRestaurants);
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById);
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines);

router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);

module.exports = router;
