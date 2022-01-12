const { Database } = require("../../db");

const db = new Database();

const myBlogs = async (req, res) => {
  const method = req.method;

  if (method === "GET") {
    const response = await retrieveBlogs(req);
    res.status(response.status).json(response);
  } else {
    return res
      .status(405)
      .json({ message: "This endpoint only uses POST method" });
  }
};

const retrieveBlogs = async (req) => {
  let response;
  try {
    const userId = req.query.userId;
    const blogs = await db.query(
      `SELECT * FROM public."Blogs" WHERE blog_user_id = ${userId}`
    );
    response = { status: 200, blogs: blogs };
  } catch (err) {
    response = {
      status: 500,
      message: err.message,
    };
  }
  return response;
};

export default myBlogs;
