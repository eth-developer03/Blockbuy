// const verify = async (req, res, next) => {
//   var token = req.header('authorization');
//   if (typeof token !== undefined) {
//     const token2 = token.split(' ');
//     const bearer = token2[1];
//     req.token = bearer;

//     next();
//   } else {
//     res.send('error in verifying');
//   }
// };

// module.exports = verify;
//
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key'; // Define your JWT secret key

const verify = async (req, res, next) => {
  const token = req.header('authorization'); // Get the token from the header
  if (typeof token !== 'undefined') {
    const tokenParts = token.split(' ');
    const bearerToken = tokenParts[1];

    // Verify the token using JWT
    jwt.verify(bearerToken, JWT_SECRET, (err, authData) => {
      if (err) {
        return res.sendStatus(403); // Forbidden if verification fails
      } else {
        req.token = bearerToken;

        // req.authData = authData;
        next(); // Proceed to the next middleware or route
      }
    });
  } else {
    res.sendStatus(403); // Forbidden if no token provided
  }
};

module.exports = verify;
