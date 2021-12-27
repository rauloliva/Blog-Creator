import React, { Fragment, useCallback, useEffect, useState } from "react";
const Layout = React.lazy(() => import("../../components/LayoutAdmin"));
const BlogForm = React.lazy(() => import("../../components/BlogFormAdmin"));
const Loading = React.lazy(() => import("../../components/Loading"));
import { request, global } from "../../utils";
import Redirect from "./Redirect";
import { Logger } from 'react-logger-lib';

const NewBlog = () => {
  const [ user, setUser ] = useState({});
  const [ notAuth, setNotAuth ] = useState(false)

  const fetchUser = useCallback(async () => {
    const access_token = localStorage.getItem("access_token");
    try {
      const res = await request(
        `${global.API_URL}user`,
        "GET",
        undefined,
        "authenticate",
        access_token
      );
      setUser( res.user );
    } catch (error) {
      Logger.of('URI.new-blog.request').error('Request failed: ', error);
      setNotAuth(true)
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Fragment>
      {
        user.user_id && (
          <Layout>
            <BlogForm user={user} />
          </Layout>
        )
      }

      { notAuth && <Redirect /> }

      { (!user.user_id && !notAuth) && <Loading /> }
    </Fragment>
  );
};



export default NewBlog;
