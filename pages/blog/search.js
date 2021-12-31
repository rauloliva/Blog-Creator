import { Fragment, useState } from "react";
import { Logger } from "react-logger-lib";
import Footer from "../../components/Footer";
import LinkInternal from "../../components/LinkInternal";
import NavBar from "../../components/NavBar";
import { request, global } from "../../utils";
import moment from "moment";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import Metadata from "../../components/Metadata";
let inputSearch = "";
const metadata = {
  pageTitle: "Search Blog",
  description: "Search blog by title",
  keywords: "search blog, blog search, blog search by title",
};

const SearchBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState(false);

  const search = async () => {
    try {
      setLoading(true);
      const res = await request(
        `${global.API_URL}blog/search?blogTitle=${input}`,
        "GET"
      );
      if (res.blogs.length == 0) {
        inputSearch = input;
        setNotFoundMessage(true);
      }
      setBlogs(res.blogs);
      setLoading(false);
    } catch (error) {
      Logger.of("blog.search.request").error("Request failed: ", error);
    }
  };

  let results = (
    <NotFound input={inputSearch} notFoundMessage={notFoundMessage} />
  );

  if (blogs.length > 0 && !loading) {
    results = blogs.map((blog) => {
      const blog_creation_date = moment(blog.blog_creation_date).format(
        "MMM Do YY"
      );
      return (
        <div key={`${blog.blog_id}-blog`} className="search__blog-container">
          <h2>{blog.blog_title}</h2>
          <p>{blog.blog_introduction.substring(0, 230) + "..."}</p>
          <p>{blog_creation_date}</p>
          <p>
            <LinkInternal href={`${blog.blog_code}`} text="Read More" />
          </p>
        </div>
      );
    });
  } else if (loading) {
    results = <Loading />;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <Fragment>
      <Metadata {...metadata} />
      <NavBar />
      <div className="nav__title-container">
        <h1 className="nav__title">Search Blog</h1>
      </div>

      <div className="search">
        <form onSubmit={submitHandler} className="search__container">
          <input
            type="text"
            className="search__input"
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn__active mauto" onClick={search}>
            Search
          </button>
        </form>
      </div>

      {blogs.length > 0 && (
        <div className="search__results-container">
          <span className="search__results-text">
            Total results: {blogs.length}
          </span>
        </div>
      )}

      <div className="search__blog">{results}</div>
      <Footer />
    </Fragment>
  );
};

export default SearchBlog;
