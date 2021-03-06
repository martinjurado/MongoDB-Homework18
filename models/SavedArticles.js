var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SavedArticleSchema = new Schema ({

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


var savedArticle = mongoose.model("Saved", SavedArticleSchema);

module.exports = savedArticle;