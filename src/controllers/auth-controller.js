const path = require("path");
const {
  signJwt,
  verifyJwt,
  getJwtFromHeader,
} = require("../factories/auth/jwt");
const UserConfig = require("../factories/auth/user-config");

const model = "auth";

const getUsers = () => {
  return UserConfig.getUsers();
};

module.exports = {
  index(req, res) {
    return res.sendFile(
      path.join(`${process.env.ROOT_PATH}/views/${model}`, "index.html")
    );
  },
  login(req, res) {
    const email = req.body.email;
    if (email) {
      const users = getUsers();
      const user = users.find((user) => {
        return user.email === email;
      });
      const password = req.body.password;
      if (user && user.password === password) {
        const jwt = signJwt(email);
        res.json({ isAuth: true, jwt: jwt });
        return;
      }
    }
    res.json({ isAuth: false });
  },
  logout(req, res) {
    return res.sendFile(
      path.join(`${process.env.ROOT_PATH}/views/${model}`, "logout.html")
    );
  },
  me(req, res) {
    const jwt = getJwtFromHeader(req);
    const verifiedData = verifyJwt(jwt);
    res.json({
      isValid: verifiedData.isValid,
      data: { email: verifiedData.data.email },
    });
  },
};
