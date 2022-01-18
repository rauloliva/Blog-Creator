const { db } = require("../db");
const { loggerConstructor } = require("../logger");
const logger = loggerConstructor("blog / recent");

const getRecentBlogs = async (req, res) => {
  const method = req.method;
  logger.info(`${method} requesting to /api/blog/recent`);

  if (method === "GET") {
    const response = await retrieveBlogs();
    res.status(response.status).json(response);
  } else {
    return res
      .status(405)
      .json({ message: "This endpoint only uses GET method" });
  }
};

const retrieveBlogs = async () => {
  let response;
  try {
    const result = await db.query(
      `SELECT * FROM public."Blogs" ORDER BY blog_id DESC LIMIT 12`
    );

    response = { status: 200, blogs: result };
  } catch (error) {
    console.error(error);
    response = { status: 500, message: error };
  } finally {
    await db.close()
  }
  return response;
};

export default getRecentBlogs;
