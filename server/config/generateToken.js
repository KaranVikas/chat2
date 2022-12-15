// json token [ JWT ]-> helps to authorise the user in backend
// user trying to use resource that is allocate to him
// user send JWT to backend and backend verify that
// okay this is user authorize to access this particular resource.
// only then the user is allowed to use it

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  // .sign -> sign a token with paticular new id
  //
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
