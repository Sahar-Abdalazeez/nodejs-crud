const express = require("express");
const app = express();
const mysql = require("mysql2");
app.use(express.json());
const PORT = 3000;

//user apis
//connection with db
const connection = mysql.createConnection({
  host: "localhost",
  database: "CRUD_TASK2",
  user: "root",
  password: "",
});

//add user to database
app.post("/addUser", (req, res) => {
  let { userName, email, age, password, address } = req.body;
  connection.execute(
    `INSERT INTO users(userName,email,age,password,address) VALUES ('${userName}','${email}','${age}','${password}','${address}') `
  );
  res.json({ message: "user added successfully " });
});

//update existing user
app.patch("/updateUser", (req, res) => {
  const { id, userName, email, address, password, age } = req.body;
  connection.execute(
    `UPDATE users SET userName='${userName}', email='${email}', address='${address}' ,password='${password}', age='${age}' WHERE id='${id}' `
  );
  res.json({ message: "user updated " });
});

//get all users
app.get("/getUsers", (req, res) => {
  connection.execute(`SELECT * FROM users`, (error, result) => {
    res.json({ message: "done", user: result });
  });
});

//delete existing user
app.delete("/deleteUser", (req, res) => {
  const { id } = req.body;
  connection.execute(`DELETE FROM users WHERE id='${id}' `);
  res.json({ message: "user deleted " });
});

//get user details
app.get("/userDetails/:id", (req, res) => {
  //to get data from link use params
  let { id } = req.params;
  connection.execute(
    `SELECT userName,email FROM users  where id= ${id}`,
    (err, result) => {
      res.json({ message: "DETAILS RETURNED SUCCESSFULLY", res: result });
    }
  );
});

//blogs apis
//add blog api
app.post("/addBlog", (req, res) => {
  let { title, description } = req.body;
  connection.execute(
    `INSERT INTO blogs (title,description) VALUES ('${title}','${description}')`
  );
  res.json({ message: "blog added successffully " });
});

//get all blogs
app.get("/getBlogs", (req, res) => {
  connection.execute(`SELECT * FROM blogs`, (error, result) => {
    res.json({ message: "done ", blogs: result });
  });
});

//get blog by id
app.get("/getBlog", (req, res) => {
  let { id } = req.body;
  console.log("===id", id);
  connection.execute(`SELECT * FROM blogs WHERE id=${id}`, (error, result) => {
    res.json({ message: "done ", blog: result });
  });
});

//delete blog
app.delete("/deleteBlog", (req, res) => {
  let { id } = req.body;
  connection.execute(`DELETE FROM blogs WHERE id=${id}`);
  res.json({ message: "blog deleted" });
});

app.listen(PORT);
