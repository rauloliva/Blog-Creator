const { db } = require('../../db');
const { loggerConstructor } = require('../../logger');
const logger = loggerConstructor('blog / blog_code / [code]');

const getBlogs = async (req, res) => {
  const method = req.method;
  const blogCode = req.query.code;
  logger.info(`${method} requesting to /api/blog/blog_code/${blogCode}`);

  if (method === 'GET') {
    const response = await getBlog(blogCode);
    res.status(response.status).json(response);
  } else if (method === 'PUT') {
    const response = await updateBlog(req);
    res.status(response.status).json(response);
  } else if (method === 'DELETE') {
    const response = await deleteBlog(blogCode);
    res.status(response.status).json(response);
  } else {
    return res
      .status(405)
      .json({ message: 'This endpoint only uses POST method' });
  }
};

const getBlog = async blog_code => {
  let response;

  try {
    const blog = await db.query(
      `SELECT * FROM public."Blogs" WHERE blog_code = '${blog_code}'`
    );
    response = { status: 200, blog };
  } catch (err) {
    response = {
      status: 500,
      message: err.message,
    };
  }

  return response;
};

const updateBlog = async req => {
  let response;
  try {
    const code = req.query.code;
    const { title, introduction, body, conclusion } = JSON.parse(req.body);
    let newCode = code;
    if (!validateTitle(code, title)) {
      newCode = generateBlogCode(title);
    }
    await db.query(`UPDATE public."Blogs" SET blog_code = '${newCode}', blog_title = '${title}', blog_introduction = '${introduction}',
         blog_body = '${body}', blog_conclusion = '${conclusion}' WHERE blog_code = '${code}'`);

    response = { status: 200, blog_title: title, blog_code: newCode };
  } catch (err) {
    response = {
      status: 500,
      message: err.message,
    };
  }
  return response;
};

const deleteBlog = async code => {
  let response;
  try {
    await db.query(`DELETE FROM public."Blogs" WHERE blog_code = '${code}'`);

    response = { status: 200 };
  } catch (err) {
    response = {
      status: 500,
      message: err.message,
    };
  }
  return response;
};

const validateTitle = (code, title) => {
  const currentCode = code.split('-').slice(0, -1).join('-');
  const currentTitle = title.toUpperCase().replace(/ /g, '-');
  return currentCode === currentTitle;
};

const generateBlogCode = title => {
  const random_num = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  return title.toUpperCase().replace(/ /g, '-') + '-' + random_num;
};

export default getBlogs;
