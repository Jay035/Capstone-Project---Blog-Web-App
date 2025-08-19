import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/createPost", (req, res) => {
  res.render("createPost.ejs");
});

app.get("/blogs", (req, res) => {
  res.render("blogs.ejs", { blogs: blogs });
});

app.get("/blog/edit/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const blog = blogs.find((b) => b.id === blogId);

  if (blog) {
    res.render("blogEdit.ejs", { blog: blog });
  } else {
    res.status(404).send("Blog not found");
  }
});

app.post("/blog/edit/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  console.log("Editing blog with ID:", blogId);
  const blogIndex = blogs.findIndex((b) => b.id === blogId);

  if (blogIndex === -1) return res.status(404).send("Blog not found");

  const { title, author, content } = req.body;

  blogs[blogIndex] = {
    ...blogs[blogIndex],
    title,
    author,
    text: content,
    updatedAt: new Date(),
  };

  res.redirect("/blogs");
});

app.post("/blog/delete/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const blogIndex = blogs.findIndex((b) => b.id === blogId);

  if (blogIndex === -1) {
    return res.status(404).send("Blog not found");
  }

  blogs.splice(blogIndex, 1);
    res.redirect("/blogs");
//   res.send(`
//   <h2>Blog deleted successfully</h2>
//   <a href="/blogs">Back to blogs</a>
// `);
});

app.post("/submit", (req, res) => {
  const { title, author, content } = req.body;
  // console.log(`Title: ${title}, Content: ${content}, Author: ${author}`);
  const newPost = {
    id: Math.floor(Math.random() * 1000000),
    title,
    author,
    text: content,
    createdAt: new Date(),
  };
  blogs.push(newPost);

  console.log("New blog added:", newPost);
  res.redirect("/blogs");
//   res.send(`
//   <h2>Blog post submitted successfully</h2>
//   <a href="/blogs">Back to blogs</a>
// `);
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

const blogs = [];

// const blogPosts = [
//   {
//     title: "Smashing Magazine",
//     link: "https://www.smashingmagazine.com",
//   },
//   {
//     title: "CSS-Tricks",
//     link: "https://css-tricks.com",
//   },
//   {
//     title: "Daring Fireball",
//     link: "https://daringfireball.net/",
//   },
//   {
//     title: "web.dev Blog",
//     link: "https://web.dev/blog/",
//   },
//   {
//     title: "The Daily WTF",
//     link: "https://thedailywtf.com",
//   },
//   {
//     title: "Jake Archibald",
//     link: "https://jakearchibald.com/",
//   },
// ];
