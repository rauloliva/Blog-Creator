require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Database } = require("../db");
const { loggerConstructor } = require("../logger");
const logger = loggerConstructor("user / index");

const db = new Database();

const userLogin = async (req, res) => {
  const method = req.method;
  logger.info(`${method} requesting to /api/user/index`);

  if (method === "POST") {
    const response = await login(req);
    res.status(response.status).json(response);
  } else {
    return res
      .status(405)
      .json({ message: "This endpoint only uses POST method" });
  }
};

const login = async (req) => {
  let response;
  try {
    const { email, password } = JSON.parse(req.body);

    const user = await db.query(
      `SELECT * FROM public."Users" WHERE user_email = '${email}'`
    );

    if (user) {
      const result = await bcrypt.compare(password, user.user_password);
      if (result) {
        const access_token = jwt.sign(user, process.env.JWT_ACCESS_TOKEN);
        response = { user, access_token, status: 200 };
      } else {
        response = { message: "The Credentials are incorrect", status: 401 };
      }
    } else {
      response = { message: "The Credentials are incorrect", status: 401 };
    }
  } catch (error) {
    if (error.code == 0) {
      response = {
        message: "The Credentials are incorrect",
        error: error,
        status: 401,
      };
    } else {
      response = {
        message: "Server internal error",
        error: error,
        status: 500,
      };
    }
  }
  return response;
};

export default userLogin;
