import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Logger } from "react-logger-lib";
import Loading from "../../components/Loading";
const Layout = React.lazy(() => import("../../components/LayoutAdmin"));
const MyBlogsList = React.lazy(() => import("../../components/MyBlogs"));
import { request, global } from "../../utils";
import Redirect from "./Redirect";

const MyBlogs = () => {
  const [user, setUser] = useState({});
  const [notAuth, setNotAuth] = useState(false);

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
      setUser(res.user);
    } catch (error) {
      Logger.of("URI.my-blogs.request").error("Request failed: ", error);
      setNotAuth(true);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Fragment>
      {user.user_id && (
        <Layout>
          <MyBlogsList user={user} />
        </Layout>
      )}

      {notAuth && <Redirect />}

      {!user.user_id && !notAuth && <Loading />}
    </Fragment>
  );
};

export default MyBlogs;
