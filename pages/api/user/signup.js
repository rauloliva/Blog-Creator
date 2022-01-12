const bcrypt = require("bcrypt");
const { Database } = require("../db");
const { loggerConstructor } = require("../logger");
const logger = loggerConstructor("database");

const db = new Database();

const signUp = async (req, res) => {
  const method = req.method;
  logger.info(`${method} requesting to /api/user/signup`);

  if (method === "POST") {
    const response = await insertUser(req);
    res.status(response.status).json(response);
  } else {
    logger.error(`This endpoint does not accept ${method} method`);
    return res
      .status(405)
      .json({ message: `This endpoint does not accept ${method} method` });
  }
};

const insertUser = async (req) => {
  let response;
  try {
    const formData = JSON.parse(req.body);
    const {
      user_first_name,
      user_last_name,
      user_email,
      user_phone,
      user_birthday,
      user_description,
      user_password,
      user_title,
    } = formData;

    const password_hashed = await bcrypt.hash(user_password, 10);

    const user = await db.query(
      `INSERT INTO public."Users" (user_first_name, user_last_name, user_email, user_phone, user_birthday, user_description, user_password, user_title, user_status) VALUES ('${user_first_name}', '${user_last_name}', '${user_email}', '${user_phone}', '${user_birthday}', '${user_description}', '${password_hashed}', '${user_title}', 'ACTIVE') RETURNING *`
    );
    logger.info(`User ${user_email} created`);

    response = { user: user, status: 201 };
  } catch (error) {
    logger.error(error);
    if (error.code == 0) {
      response = { message: "User not found", error: error, status: 401 };
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

export default signUp;
