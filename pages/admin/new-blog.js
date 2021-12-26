import React, { Fragment, useCallback, useEffect, useState } from "react";
const Layout = React.lazy(() => import("../../components/LayoutAdmin"));
const BlogForm = React.lazy(() => import("../../components/BlogFormAdmin"));
import { request, global } from "../../utils";
import Redirect from "./Redirect";

const NewBlog = () => {
  const [user, setUser] = useState({});

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
      setUser({ user: res.user });
    } catch (error) {
      console.log("error ", error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Fragment>
      {user.user ? (
        <Layout>
          <BlogForm user={user} />
        </Layout>
      ) : (
        <Redirect />
      )}
    </Fragment>
  );
};

export default NewBlog;
