const mongoose = require('mongoose');
var Product = require('../db/index.js').Product;
var db = require('../db/index.js').db;
// complete the dbhelpers
var helpers = {
  getProductsHelper: () => Product.find({}),
  postProductsHelper: (item) => Product.create(item),
  updateProductHelper: (_id, curr_bid) => Product.findByIdAndUpdate(_id, curr_bid),
  deleteProductHelper: (_id) => Product.deleteOne( { _id } )
};

module.exports = helpers