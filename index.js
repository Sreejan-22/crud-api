const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
/*
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
*/
require("dotenv").config();

const app = express(); // Creates an Express application
const port = 3000;

// connect to MongoDB
const dbName = "crud-api";
const dbURI = `mongodb+srv://blog_admin:${process.env.MONGODB_ACCESS_PASSWORD}@crudapi.jnual.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) =>
    // listen for requests only after connection to the db has been made
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    })
  )
  .catch((err) => console.log(err));

app.use(express.json());

// request to the root url
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// get all blogs
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) // sorts the blogs from newest to oldest
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

// create a new blog
app.post("/blogs", (req, res) => {
  const { title, snippet, body } = req.body;
  // const blog = new Blog({
  //   title,
  //   snippet,
  //   body,
  // });

  const blogData = {
    title,
    snippet,
    body,
  };

  Blog.create(blogData, (err, newBlogData) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      res.status(201).send(newBlogData);
    }
  });

  // blog
  //   .save()
  //   .then((result) => {
  //     res.status(201).send(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).send();
  //   });
});

// get a blog by id
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id, (err, foundBlog) => {
    if (err) {
      res.send(500).send();
    } else if (foundBlog == null) {
      res.status(404).send();
    } else {
      res.send(foundBlog);
    }
  });
});

// update a blog
app.put("/blogs/:id", (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  Blog.findByIdAndUpdate(id, newData, (err, dataBeforeUpdate) => {
    if (err) {
      res.status(500).send();
    } else {
      res.send("This blog has been updated.");
    }
  });
});

// delete a blog
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
      // res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).send("Oops!! 404 page!! Not Found!!");
});
