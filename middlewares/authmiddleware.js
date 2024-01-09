const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed",
        });
      } else {
        req.body.userId = decode.userId;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Auth Failedd",
    });
  }
};


// Extract Token from Authorization Header:

// const token = req.headers["authorization"].split(" ")[1];
// The Authorization header is expected to have a value in the format: "Bearer {token}". This line extracts the token part after splitting the header value.
// Verify Token Using JWT Library:

// JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {...});
// This line uses the verify function from the jsonwebtoken library to verify the authenticity of the token. It checks if the token is valid and has not expired.
// Check for Verification Errors:

// if (err) {...}
// If there is an error during token verification (e.g., token expired, invalid signature), the function inside this block will be executed.
// Respond with 401 Unauthorized for Verification Errors:

// return res.status(401).send({ success: false, message: "Authentication failed" });
// If there is a verification error, the middleware sends a response with a 401 Unauthorized status and a message indicating authentication failure.
// Add Decoded User ID to Request Object:

// req.body.userid = decode.id;
// If the token is successfully verified, the decoded user ID is added to the request object. This allows subsequent middleware or route handlers to access the user ID.
// Call the Next Middleware: