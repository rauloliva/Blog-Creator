import Head from "next/head";
import React, { Fragment, useEffect } from "react";
import Loading from "../../components/Loading";
import Metadata from "../../components/Metadata";
const Unauthorized = React.lazy(() => import("./401"));
const Layout = React.lazy(() => import("../../components/LayoutAdmin"));
const Dashboard = React.lazy(() => import("../../components/Dashboard"));
import { useAuthenticate } from "../../utils";
const metadata = {
  pageTitle: "Welcome",
  description: "Welcome page with admin options",
  keywords: "create your blogs, dashboard, admin, admin options",
}

export default function Admin() {
  const access_token = localStorage.getItem("access_token");
  const [user, notAuth, authenticate] = useAuthenticate(access_token);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return (
    <Fragment>
      {user.user_id && (
        <Fragment>
          <Layout {...metadata}>
            <Dashboard user={user} />
          </Layout>
        </Fragment>
      )}

      {notAuth && <Unauthorized />}

      {!user.user_id && !notAuth && <Loading />}
    </Fragment>
  );
}
