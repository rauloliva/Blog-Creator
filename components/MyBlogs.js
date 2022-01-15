import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { request } from "../utils";

const MyBlogs = ({ user }) => {
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await request(
        `/api/blog/blogs-by-user/${user.user_id}`,
        "GET",
        undefined,
        "get-blogs-by-user"
      );
      if (response.status === 200) {
        if (Array.isArray(response.blogs)) {
          setBlogs(response.blogs);
        } else {
          setBlogs([response.blogs]);
        }
      }
    };

    if (user.user_id) {
      fetchBlogs();
    }
  }, [user]);

  const goToBlogHandler = (blogCode) => {
    router.push(`edit-blog?blogCode=${blogCode}`);
  };

  return (
    <div className="blogs">
      <div className="blogs__title">
        <h2 className="title">My Blogs</h2>
      </div>
      <div className="blogs__container">
        <div className="blogs__row">
          {blogs.map((blog) => {
            const date = new Date(blog.blog_creation_date);
            return (
              <div
                className="blogs__item"
                key={blog.blog_id}
                onClick={() => goToBlogHandler(blog.blog_code)}
              >
                <h3 className="blogs__item__title">
                  {blog.blog_title.toUpperCase().substring(0, 30) + "..."}
                </h3>
                <p className="blogs__item__description">
                  {blog.blog_introduction.substring(0, 60) + "..."}
                </p>
                <p className="blogs__item__date">
                  {date.getFullYear() +
                    "-" +
                    (date.getMonth() + 1) +
                    "-" +
                    date.getDate()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
