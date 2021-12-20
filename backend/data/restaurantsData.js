const { ObjectId } = require("mongodb");

let restaurants;
class RestaurantsData {
  static async injectDB(conn) {
    if (restaurants) {
      return;
    }

    try {
      console.log("connected to server");
      // connecting database to server
      restaurants = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("restaurants");
    } catch (err) {
      console.error("unable to connect " + err);
    }
  }

  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }

    let cursor;

    try {
      // Here we are finding all the data accouding to the query
      cursor = await restaurants.find(query);
    } catch (err) {
      console.error(`Unable to issue find command, ${err}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }

    // Here we are making sure that only limited data should be shown
    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page);

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants = await restaurants.countDocuments(query);

      return { restaurantsList, totalNumRestaurants };
    } catch (err) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${err}`
      );

      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }

  static async getRestaurantById(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "reviews",
            let: {
              id: "$_id",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$restaurant_id", "$$id"],
                  },
                },
              },
              {
                $sort: {
                  data: -1,
                },
              },
            ],
            as: "reviews",
          },
        },
        {
          $addFields: {
            reviews: "$reviews",
          },
        },
      ];

      return await restaurants.aggregate(pipeline).next();
    } catch (err) {
      console.error(`Something want wrong in the getRestaurantById: ${err}`);
      throw err;
    }
  }

  static async getCuisines() {
    let cuisines = [];
    try {
      cuisines = await restaurants.distinct("cuisine");
      return cuisines;
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return cuisines;
    }
  }
}

module.exports = RestaurantsData;
