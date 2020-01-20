var mongoose = require('mongoose');
// Complete the productSchema below.
var productSchema= mongoose.Schema ({
  item: String,
  min_cost: Number,
  curr_bid: Number,
  ends_in: Number,
  image: String
});
 
 /*
  ensure your schema has the following:
    item:
      - string,
    min_cost:
      - number,
    curr_bid:
      - number,
    ends_in:
      - number
    image:
      - string
*/

module.exports = productSchema;
