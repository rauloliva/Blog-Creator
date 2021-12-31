import React from "react";
import { request } from "../../utils";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import BlogContent from "../../components/Blog";
import { global } from "../../utils";
import Metadata from "../../components/Metadata";
const metadata = {
  description: "List all blogs created from newest to oldest",
  keywords: "blog list, blogs, recent blogs",
};

const Blog = (props) => (
  <div className="blog__box">
    <Metadata {...metadata} pageTitle={props.blog.blog_title} />
    <NavBar />
    <BlogContent blog={props.blog} author={props.author} />
    <Footer />
  </div>
);

export async function getStaticPaths() {
  const res = await request(`${global.API_URL}blog/blog_code`, "GET");
  const paths = res.blog_codes.map((blog) => ({
    params: {
      blog_code: blog.blog_code,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(path) {
  const blog_code = path.params.blog_code;
  let blog = {};

  const fetchBlog = async () => {
    const response = await request(
      `${global.API_URL}blog/blog_code/${blog_code}`,
      "GET"
    );
    if (response.status === 200) {
      blog = response.blog;
    }
  };

  await fetchBlog();

  return {
    props: {
      blog: blog,
    },
    revalidate: 10,
  };
}

export default Blog;
