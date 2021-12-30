import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Logger } from "react-logger-lib";
import Loading from "../../components/Loading";
const Unauthorized = React.lazy(() => import("./401"));
const Layout = React.lazy(() => import("../../components/LayoutAdmin"));
const Dashboard = React.lazy(() => import("../../components/Dashboard"));
import { request, global } from "../../utils";

export default function Admin() {
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
