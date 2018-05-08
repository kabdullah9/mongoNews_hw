var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var CommentSchema = new Schema({
  Comment:{
      type: String,
      require: true

  },
  createdAt:{
      type: Date,
      default:Date.now()

  }
});
var COM = mongoose.model("Comment", CommentSchema);
module.exports = COM;