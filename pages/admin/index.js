import React, { Fragment, useEffect } from "react";
import Loading from "../../components/Loading";
const Unauthorized = React.lazy(() => import("./401"));
const Layout = React.lazy(() => import("../../components/LayoutAdmin"));
const Dashboard = React.lazy(() => import("../../components/Dashboard"));
import { useAuthenticate } from "../../utils";

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
          <Layout>
            <Dashboard user={user} />
          </Layout>
        </Fragment>
      )}

      {notAuth && <Unauthorized />}

      {!user.user_id && !notAuth && <Loading />}
    </Fragment>
  );
}
