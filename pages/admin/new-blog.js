import React, { Fragment, useEffect } from "react";
const Layout = React.lazy(() => import("../../components/LayoutAdmin"));
const BlogForm = React.lazy(() => import("../../components/BlogFormAdmin"));
const Loading = React.lazy(() => import("../../components/Loading"));
import Unauthorized from "./401";
import { useAuthenticate } from "../../utils";
const metadata = {
  pageTitle: "New Blog",
  description: "Create a new blog",
  keywords: "create blog, create new blog, creation, blog",
};

const NewBlog = () => {
  const access_token = localStorage.getItem("access_token");
  const [user, notAuth, authenticate] = useAuthenticate(access_token);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return (
    <Fragment>
      {user.user_id && (
        <Layout {...metadata}>
          <BlogForm user={user} />
        </Layout>
      )}

      {notAuth && <Unauthorized />}

      {!user.user_id && !notAuth && <Loading />}
    </Fragment>
  );
};

export default NewBlog;
