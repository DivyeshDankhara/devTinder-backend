const express = require("express");

const app = express();

app.use("/", (request, response) => {
    response.send("Hello from dashboard");
})

app.use("/hello", (request, response) => {
    response.send("Hello hello");
})

app.use("/test", (request, response) => {
    response.send("Hello from the server");
})

app.listen(3000, () => {
    console.log("Server is successfully listing on port 3000...");
});