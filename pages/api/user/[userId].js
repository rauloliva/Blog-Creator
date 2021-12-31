const pgp = require("pg-promise")({ noWarnings: true });
const bcrypt = require("bcrypt");

const db = pgp(`postgres://rauloliva:raulito10@localhost:5433/blog_creator`);

const user = async (req, res) => {
  const method = req.method;
  console.log(method);

  if (method === "PATCH") {
    console.log('NOW HERE');
    const response = await updateUser(req);
    res.status(response.status).json(response);
  } else if (method === "GET") {
    const response = await getUser(req);
    res.status(response.status).json(response);
  } else if (method === "POST") {
    const response = await insertUser(req);
    res.status(response.status).json(response);
  } else {
    return res
      .status(405)
      .json({ message: "This endpoint only uses PATCH method" });
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

    const user = await db.one(
      `INSERT INTO public."Users" (user_first_name, user_last_name, user_email, user_phone, user_birthday, user_description, user_password, user_title) VALUES ('${user_first_name}', '${user_last_name}', '${user_email}', '${user_phone}', '${user_birthday}', '${user_description}', '${password_hashed}', '${user_title}') RETURNING *`
    );

    response = { user: user, status: 200 };
  } catch (error) {
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

const updateUser = async (req) => {
  let response;
  try {
    const { userId } = req.query;
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
    console.log(password_hashed);
    await db.none(
      `UPDATE public."Users" SET user_first_name = '${user_first_name}', user_last_name = '${user_last_name}', user_email = '${user_email}', user_phone = '${user_phone}', user_birthday = '${user_birthday}', user_description = '${user_description}', user_password = '${password_hashed}', user_title = '${user_title}' WHERE user_id = ${userId}`
    );
    console.log("User updated");

    response = { user: formData, status: 200 };
  } catch (error) {
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

const getUser = async (req) => {
  let response;
  try {
    const { userId } = req.query;
    const user = await db.one(
      `SELECT * FROM public."Users" WHERE user_id = ${userId}`
    );
    response = { user: user, status: 200 };
  } catch (error) {
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

export default user;
