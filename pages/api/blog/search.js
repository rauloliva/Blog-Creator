const { Database } = require("../db");
const { loggerConstructor } = require("../logger");
const logger = loggerConstructor("blog / search");

const db = new Database();

const getRecentBlogs = async (req, res) => {
  const method = req.method;
  logger.info(`${method} requesting to /api/blog/search`);

  if (method === "GET") {
    const response = await retrieveBlogs(req);
    res.status(response.status).json(response);
  } else {
    return res
      .status(405)
      .json({ message: "This endpoint only uses GET method" });
  }
};

const retrieveBlogs = async (req) => {
  const blogTitle = req.query.blogTitle;
  let response;
  try {
    const result = await db.query(
      `SELECT * FROM public."Blogs" WHERE LOWER(blog_title) LIKE LOWER('%${blogTitle}%') ORDER BY blog_id`
    );

    response = { status: 200, blogs: result };
  } catch (error) {
    console.error(error);
    response = { status: 500, message: error };
  }
  return response;
};

export default getRecentBlogs;
