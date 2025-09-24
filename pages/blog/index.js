import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { Fragment } from 'react';
import moment from 'moment';
import LinkInternal from '../../components/LinkInternal';
import Metadata from '../../components/Metadata';
import { db } from '../api/db';
const metadata = {
  pageTitle: 'Recent Blogs',
  description: 'List all blogs created from newest to oldest',
  keywords: 'blog list, blogs, recent blogs',
};

const Main = props => (
  <Fragment>
    <Metadata {...metadata} />
    <NavBar />
    <div className="nav__title-container">
      <h1 className="nav__title">recent blogs</h1>
    </div>

    <div className="recentBlogs">
      {JSON.parse(props.recentBlogs).map(blog => {
        const blog_creation_date = moment(blog.blog_creation_date).format(
          'MMM Do YY'
        );
        return (
          <div key={`${blog.blog_id}-blog`} className="recentBlogs__container">
            <h2>{blog.blog_title}</h2>
            <p>{blog.blog_introduction.substring(0, 120) + '...'}</p>
            <p>{blog_creation_date}</p>
            <p>
              <LinkInternal href={`blog/${blog.blog_code}`} text="Read More" />
            </p>
          </div>
        );
      })}
    </div>
    <Footer />
  </Fragment>
);

export async function getStaticProps() {
  const getRecentBlogs = async () => {
    const blogs = await db.query(
      `SELECT * FROM public."Blogs" ORDER BY blog_id DESC LIMIT 12`
    );

    if (blogs) {
      // make sure the API returns an arrays of blogs
      if (!Array.isArray(blogs)) {
        return JSON.stringify([blogs]);
      }

      return JSON.stringify(blogs);
    }
    return [];
  };

  return {
    props: { recentBlogs: await getRecentBlogs() },
    revalidate: 10,
  };
}

export default Main;
