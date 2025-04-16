const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./model/user");
const { request } = require("http");

app.use(express.json());

app.post("/signup", async (request, response) => {
  // Creathing a new instance of the User model
  const user = new User(request.body);

  try {
    await user.save();
    response.send("User Added successfully!");
  } catch (err) {
    response.status(400).send("Error saving the user:" + err.message);
  }
});

// GET user by email
app.get("/user", async (request, response) => {
  const userEmail = request.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      response.status(404).send("User not found");
    } else {
      response.send(user);
    }

    // const users = await User.find({emailId: userEmail});
    // if(users.length === 0) {
    //   response.status(404).send("User not found");
    // } else {
    //   response.send(users);
    // }
  } catch (err) {
    response.status(400).send("Something went wrong");
  }
});

// GET user by id
app.get("/userid/:_id", async (request, response) => {
  try {
    const id = request.params._id;
    const user = await User.findById(id);
    
    if (!user) {
      response.status(404).send("User not found");
    } else {
      response.send(user);
    }
  } catch (err) {
    response.status(400).send("Something went wrong");
  }
});

// Feed API - GET / feed - get all the users from the database
app.get("/feed", async (request, response) => {
  try {
    const users = await User.find({});
    response.send(users);
  } catch (err) {
    response.status(400).send("Something went wrong");
  }
});

// Delete a user from the database
app.delete("/user", async (request, response) => {
  const userId = request.body.userId;
  try {
    const user = await User.findByIdAndDelete({_id: userId});
    // const user = await User.findByIdAndDelete(userId);
    response.send("User deleted successfully");
  } catch (err) {
    response.status(400).send("Something went wrong");
  }
})


// update data of the user
app.patch("/user", async (request, response) => {
  const userId = request.body.userId;
  const data = request.body;
  
  try {
    const user = await User.findByIdAndUpdate({_id: userId}, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user); 
    response.send("User updated successfully");
  } catch (err) { 
    response.status(400).send("UPDATE FAILED:" + err.message);
  }
})

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is successfully listing on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be established!!");
  });
