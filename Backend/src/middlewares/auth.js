const adminAuth = (request, response, next) => {
  console.log("Admin auth is getting checked!!");
  const token = "xyz";
  const isAdminAuthorized = token == "xyz";
  if (!isAdminAuthorized) {
    response.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

const userAuth = (request, response, next) => {
  console.log("User auth is getting checked!!");
  const token = "xyzmm";
  const isAdminAuthorized = token == "xyz";
  if (!isAdminAuthorized) {
    response.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = {
    adminAuth,
    userAuth,
}
