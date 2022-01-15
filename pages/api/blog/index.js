const { Database } = require("../db");
const { loggerConstructor } = require("../logger");
const logger = loggerConstructor("blog / index");

const db = new Database();

const createBlog = async (req, res) => {
  const method = req.method;
  logger.info(`${method} requesting to /api/blog/index`);

  if (method === "POST") {
    const response = await create(req);
    res.status(response.status).json(response);
  } else {
    return res
      .status(405)
      .json({ message: "This endpoint only uses POST method" });
  }
};

const create = async (req) => {
  let response;
  try {
    const { title, introduction, body, conclusion, author } = JSON.parse(
      req.body
    );
    const blogCode = generateBlogCode(title);
    const introduction_cleaned = introduction.replace(/'/g, "´");
    const body_cleaned = body.replace(/'/g, "´");
    const conclusion_cleaned = conclusion.replace(/'/g, "´");

    const result = await db.query(
      `INSERT INTO public."Blogs" (blog_code, blog_title, blog_introduction, blog_body, blog_conclusion, blog_user_id) VALUES ('${blogCode}' ,'${title}', '${introduction_cleaned}','${body_cleaned}', '${conclusion_cleaned}', ${author}) RETURNING *`
    );

    response = { status: 201, blog: result };
  } catch (error) {
    console.error(error);
    response = { status: 500, message: error };
  }
  return response;
};

const generateBlogCode = (title) => {
  const random_num = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  return (
    title.toUpperCase().replace(/ /g, "-").replace("'", "´") + "-" + random_num
  );
};

export default createBlog;
