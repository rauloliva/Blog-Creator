import { Fragment } from "react";
import moment from "moment";

const BlogContent = ({ blog }) => {
  // create the paragraphs
  let blog_introduction, blog_body, blog_conclusion;
  if (blog.blog_body) {
    blog_introduction = blog.blog_introduction
      .split("\n")
      .map((line, index) => <p key={"intro_" + index}>{line}</p>);

    blog_body = blog.blog_body
      .split("\n")
      .map((line, index) => <p key={"body_" + index}>{line}</p>);

    blog_conclusion = blog.blog_conclusion
      .split("\n")
      .map((line, index) => <p key={"conclusion_" + index}>{line}</p>);
  }

  const blog_creation_date = moment(blog.blog_creation_date).format(
    "MMM Do YY"
  );
  const author_name = blog.user_first_name + " " + blog.user_last_name;

  return (
    <Fragment>
      <div className="blog__title-container">
        <h1 className="blog__title">{blog.blog_title}</h1>
        <span className="blog__author">
          <span className="blog__author-date">{blog_creation_date}</span>
          <span className="blog__author-name">by {author_name}</span>
        </span>
      </div>

      <div className="blog">
        <div className="blog__introduction">{blog_introduction}</div>

        <hr />

        <div className="blog__body">{blog_body}</div>

        <div className="blog__conclusion">{blog_conclusion}</div>

        <hr />
        <div className="author">
          <h2>Author</h2>
          <span className="author__name">{author_name}</span>
          <span className="author__title">{blog.user_title}</span>
          <p className="author__description">{blog.user_description}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogContent;
