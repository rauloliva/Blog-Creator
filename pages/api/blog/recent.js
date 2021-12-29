const pgp = require("pg-promise")({ noWarnings: true });

const db = pgp(`postgres://rauloliva:raulito10@localhost:5433/blog_creator`);

const getRecentBlogs = async (req, res) => {
  const method = req.method;

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
    const result = await db.any(
      `SELECT * FROM public."Blogs" ORDER BY blog_id DESC LIMIT 12`
    );

    response = { status: 200, blogs: result };
  } catch (error) {
    console.error(error);
    response = { status: 500, message: error };
  }
  return response;
};

export default getRecentBlogs;
