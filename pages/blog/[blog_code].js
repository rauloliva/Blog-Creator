import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import BlogContent from '../../components/Blog';
import Metadata from '../../components/Metadata';
import { db } from '../api/db';
const metadata = {
  description: 'List all blogs created from newest to oldest',
  keywords: 'blog list, blogs, recent blogs',
};

const Blog = props => (
  <div className="blog__box">
    <Metadata {...metadata} pageTitle={props.blog.blog_title} />
    <NavBar />
    <BlogContent blog={JSON.parse(props.blog)} author={props.author} />
    <Footer />
  </div>
);

export async function getStaticPaths() {
  let blogs_codes = await db.query(`SELECT blog_code FROM public."Blogs"`);

  // make sure the API returns an arrays of blogs
  if (!Array.isArray(blogs_codes)) {
    blogs_codes = [blogs_codes];
  }

  const paths = blogs_codes.map(blog => ({
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
    const blog_db = await db.query(
      `SELECT * FROM public."Blogs" AS b inner join public."Users" as u on b.blog_user_id = u.user_id WHERE blog_code = '${blog_code}'`
    );
    if (blog_db) {
      blog = JSON.stringify(blog_db);
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
