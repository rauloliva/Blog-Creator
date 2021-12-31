import React, { Fragment, useEffect } from "react";
import Loading from "../../components/Loading";
const Layout = React.lazy(() => import("../../components/LayoutAdmin"));
const MyBlogsList = React.lazy(() => import("../../components/MyBlogs"));
import Unauthorized from "./401";
import { useAuthenticate } from "../../utils";

const MyBlogs = () => {
  const access_token = localStorage.getItem("access_token");
  const [user, notAuth, authenticate] = useAuthenticate(access_token);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return (
    <Fragment>
      {user.user_id && (
        <Layout>
          <MyBlogsList user={user} />
        </Layout>
      )}

      {notAuth && <Unauthorized />}

      {!user.user_id && !notAuth && <Loading />}
    </Fragment>
  );
};

export default MyBlogs;
