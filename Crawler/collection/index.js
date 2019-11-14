const Collection = require("../../api/models/collection");
const query = require("./query");
const axios = require("axios");

function collectionCrawler() {
  axios
    .post(
      "https://gql-prod.class101.net/graphql",
      query.newCollectionList.query
    )
    .then(res => {
      res.data.data.collections.forEach(col => {
        const result = new Collection({
          description: col.description,
          itemIds: col.itemIds,
          score: col.score,
          title: col.title,
          imageUrl: col.heroImageUrl
        }).save();
        // console.log(result);
      });
    })
    .catch(err => console.log(err));
}

module.exports = collectionCrawler;