require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { db } = require("../db");
const { loggerConstructor } = require("../logger");
const logger = loggerConstructor("user / index");

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
        const access_token = jwt.sign(user, process.env.JWT_ACCESS_TOKEN, { expiresIn: '1h' });
        response = { user, access_token, status: 200 };
      } else {
        logger.error('The Credentials are incorrect');
        response = { message: "The Credentials are incorrect", status: 401 };
      }
    } else {
      logger.error(`User with email ${email} and password provided not found`);
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
  } finally {
    await db.close()
  }
  return response;
};

export default userLogin;
