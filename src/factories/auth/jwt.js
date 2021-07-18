const jwt = require("jsonwebtoken");
// const privateKey = `eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyNjU0MTE3OCwiaWF0IjoxNjI2NTQxMTc4fQ.sPCS2PWyOJpUGvPkI_L0AD-YJLjuRR5QAOCQuFbF6JY`;
const privateKey = `8y/B?E(H+MbQeThWmZq4t7w!z%C&F)J@`;

module.exports = {
  signJwt(email) {
    const token = jwt.sign({ email }, privateKey, {
      expiresIn: "1w",
      issuer: "Lutex deployer",
      audience: "deploy.lutex.io",
    });
    return token;
  },
  verifyJwt(token) {
    try {
      const decoded = jwt.verify(token, privateKey);
      return {
        isValid: true,
        data: decoded,
      };
    } catch (err) {
      return { isValid: false };
    }
  },
  getJwtFromHeader(req) {
    const authorization = req.headers.authorization;
    const authorizationSplitted = authorization.split(" ");
    const token =
      authorizationSplitted[0] === "Bearer"
        ? authorizationSplitted[1]
        : authorizationSplitted[0];
    return token;
  },
};
