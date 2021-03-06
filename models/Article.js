var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
    Headline: {
        type: String,
        require: true
    },
    Summary: {
        type: String
    },
    URL: {
        type: String
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    isSaved:{
        type: Boolean,
        default: false
    }
});
var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;