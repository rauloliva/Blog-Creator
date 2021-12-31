import React, { useEffect } from "react";
import { useSelector } from "react-redux";
const Layout = React.lazy(() => import("../../components/LayoutAdmin"));
const BlogForm = React.lazy(() => import("../../components/BlogFormAdmin"));
import { useRouter } from "next/router";
import { request } from "../../utils";
const metadata = {
  pageTitle: "Edit Blog",
  description: "Edit the selected blog",
  keywords: "edit blog, modify blog, preview blog",
}

const defaultBlog = {
  title: "",
  introduction: "",
  body: "",
  conclusion: "",
};

const EditBlog = () => {
  const router = useRouter();
  const blogCode = router.query.blogCode;
  const user = useSelector((state) => state.user).user;

  const [blog, setBlog] = React.useState(defaultBlog);

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await request("/api/blog/blog_code/" + blogCode, "GET");
      if (response.status === 200) {
        setBlog(response.blog);
      }
    };

    if (blogCode) {
      fetchBlog();
    }
  }, [blogCode]);

  return (
    <Layout {...metadata}>
      <BlogForm user={user} blog={blog} />
    </Layout>
  );
};

export default EditBlog;
