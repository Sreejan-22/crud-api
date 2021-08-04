const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a scheme
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// create a model
// model provides an interface over the schema to communicate with the database

// name of the model should start with a capital letter
// if the collection name in the database is "blogs", then we shold name the first parameter as the singular
// version of the collection i.e. Blog
// mongoose will look for the "blogs" collection based on the parameter "Blog"
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
