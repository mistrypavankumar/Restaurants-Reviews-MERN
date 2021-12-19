const RestaurantsData = require("./../data/restaurantsData");

class RestaurantsController {
  static async apiGetRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage
      ? parseInt(req.query.restaurantsPerPage, 10)
      : 20;

    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};

    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { restaurantsList, totalNumRestaurants } =
      await RestaurantsData.getRestaurants({
        filters,
        page,
        restaurantsPerPage,
      });

    let response = {
      restaurants: restaurantsList,
      page: page,
      filters: filters,
      entries_per_page: restaurantsPerPage,
      total_results: totalNumRestaurants,
    };

    // setting the response in the format of json
    res.json(response);
  }

  static async apiGetRestaurantById(req, res, next) {
    try {
      let id = req.params.id || {};
      let restaurant = await RestaurantsData.getRestaurantById(id);

      if (!restaurant) {
        res.status(404).json({ error: "Not found" });
        return;
      }

      res.json(restaurant);
    } catch (err) {
      console.log(`api, ${err}`);
      res.status(505).json({ error: err });
    }
  }

  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      cusines = await RestaurantsData.getCuisines();
      res.json(cuisines);
    } catch (err) {
      console.log(`api, ${err}`);
      res.status(505).json({ error: err });
    }
  }
}

module.exports = RestaurantsController;
