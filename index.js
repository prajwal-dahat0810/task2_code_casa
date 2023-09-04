const express = require("express");
let bodyParser = require("body-parser");
const { todo } = require("node:test");
var path = require("path");
const app = express();
const port = 3004;
let todos = [];
function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (id == arr[i].id) {
      return i;
    }
  }
  return -1;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  let todoIndex = findIndex(todos, parseInt(req.params.id));

  if (todoIndex === -1) {
    res.status(404).send(" page not find out ");
  } else {
    console.log("todoIndex:", todoIndex);

    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles.css">
        <title>To-Do List</title>
     
        </head>
<body>

    <h1 style="text-align: center; background-color: #007bff; color: #fff; padding: 20px;" >To-Do List</h1>
    <ul style="background-color: #fff; border: 1px solid #ddd; border-radius: 5px; margin: 10px 0; padding: 15px; display: flex; justify-content: space-between; align-items: center;" id="todo-list">
    <div class="todo-tittle" style="font-size: 18px; font-weight: bold;" >${todos[todoIndex].tittle}</div>
    <div style="font-size: 14px; color: #555;" class="todo-description">
    ${todos[todoIndex].description}</div>
    ${todos[todoIndex].id}
        
          </ul>
    </body>
</html>`);
  }
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/style.css", function (req, res) {
  res.sendFile(path.join(__dirname + "/style.css"));
});
app.get("/bgimg.avif", function (req, res) {
  res.sendFile(path.join(__dirname + "/bgimg.avif"));
});
app.post("/todos", (req, res) => {
  const newtodo = {
    id: Math.floor(Math.random() * 10000),
    tittle: req.body.tittle,
    description: req.body.Description,
  };
  todos.push(newtodo);
  res.send("your id is " + newtodo.id);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
