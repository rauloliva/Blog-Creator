import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Fragment } from "react";
import { request, global } from "../../utils";
import moment from "moment";
import LinkInternal from "../../components/LinkInternal";

const Main = (props) => (
  <Fragment>
    <NavBar />
    <div className="contact__title-container">
      <h1 className="contact__title">recent blogs</h1>
    </div>

    <div className="recentBlogs">
      {props.recentBlogs.map((blog) => {
        const blog_creation_date = moment(blog.blog_creation_date).format(
          "MMM Do YY"
        );
        return (
          <div key={`${blog.blog_id}-blog`} className="recentBlogs__container">
            <h2>{blog.blog_title}</h2>
            <p>{blog.blog_introduction.substring(0, 120) + "..."}</p>
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
    const response = await request(`${global.API_URL}blog/recent`, "GET");
    if (response.status === 200) {
      return response.blogs;
    } else {
      return [];
    }
  };

  return {
    props: { recentBlogs: await getRecentBlogs() },
    revalidate: 10,
  };
}

export default Main;
