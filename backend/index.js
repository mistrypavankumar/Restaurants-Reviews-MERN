const app = require("./server.js");
const mongodb = require("mongodb");
const dotenv = require("dotenv");
const RestaurantsData = require("./data/restaurantsData");
const ReviewData = require("./data/reviewsData.js");

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

// connecting to mongodb database and aslo running the server
MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.error(json({ error: err.stack }));
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantsData.injectDB(client);
    await ReviewData.injectDB(client);

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
