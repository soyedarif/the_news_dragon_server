const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const categories = require("./data/catagories.json");
const news = require("./data/news.json");

app.use(cors());

app.get("/categories", (req, res) => {
  res.send(categories);
});
//category wise news
app.get("/categories/:id", (req, res) => {
  const id = parseInt(req.params.id);
  //if category id is 0, we want all the news
  if (id === 0) {
    res.send(news);
  } else {
    const categoryNews = news.filter(n => parseInt(n.category_id) === id);
    res.send(categoryNews);
  }
});

app.get("/news", (req, res) => {
  res.send(news);
});
//one specific news by an ID
app.get("/news/:id", (req, res) => {
  const id = req.params.id;
  const selectedNews = news.find(n => n._id === id);
  res.send(selectedNews);
});

app.get("/", (req, res) => {
  res.send("Dragon is Flying");
});

app.listen(port, () => console.log(`Dragon API is running on port: ${port}`));
