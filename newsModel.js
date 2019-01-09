var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NewsSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique:true
  },
  
  link: {
    type: String,
    trim: true
  },
  
  text: {
    type: String,
    trim: true
  }
});


// This creates our model from the above schema, using mongoose's model method
var News = mongoose.model("News", NewsSchema);

// Export the User model
module.exports = News;
