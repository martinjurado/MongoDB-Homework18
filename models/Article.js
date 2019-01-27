var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({

    image: {
        type: String,
        required: true
    },
    
    title: {
        type: String,
        required: true
    },

    subtitle: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;