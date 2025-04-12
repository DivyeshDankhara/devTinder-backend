const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./model/user");

app.post("/signup", async (request, response) => {
  // Creathing a new instance of the User model
  const user = new User({
    firstName: "Divyesh",
    lastName: "Dankhara",
    emailId: "divyesh@gmail.com",
    password: "divyesh@123",
  });

  try {
    await user.save();
    response.send("User Added successfully!");
  } catch (err) {
    response.status(400).send("Error saving the user:"+ err.message);
  }
})

connectDB().then(() => {
  console.log("Database connection established...");
  app.listen(3000, () => {
    console.log("Server is successfully listing on port 3000...");
  });
}).catch(err => {
  console.error("Database cannot be established!!");
})

