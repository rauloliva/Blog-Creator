const { db } = require("../../db");
const { loggerConstructor } = require("../../logger");
const logger = loggerConstructor("blog / blog_code / index");

const retrieveAllCodes = async (req, res) => {
  const method = req.method;
  logger.info(`${method} requesting to /api/blog/blog_code/index`);

  if (method === "GET") {
    const response = await retrieveBlogs();
    res.status(response.status).json(response);
  } else {
    return res
      .status(405)
      .json({ message: "This endpoint only uses POST method" });
  }
};

const retrieveBlogs = async () => {
  let response;
  try {
    const blog = await db.query(`SELECT blog_code FROM public."Blogs"`);
    response = { status: 200, blog_codes: blog };
  } catch (err) {
    response = {
      status: 500,
      message: err.message,
    };
  } finally {
    await db.close()
  }
  return response;
};

export default retrieveAllCodes;
