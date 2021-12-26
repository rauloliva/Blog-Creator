import React, { Fragment, useEffect, useState, useCallback } from "react";
const Redirect = React.lazy(() => import("./Redirect"));
const Layout = React.lazy(() => import("../../components/LayoutAdmin"));
import { request, global } from "../../utils";

export default function Admin() {
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
      setUser({ user: res.user, isAuthenticated: true });
    } catch (error) {
      console.log("error ", error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const userObj = user.user;

  console.log("user ", userObj);

  return (
    <Fragment>
      {user.isAuthenticated ? (
        <Fragment>
          <Layout>
            <div className="dashboard">
              <div className="dashboard-header">
                <h2 className="dashboard-header-title">
                  Welcome{" "}
                  {userObj.user_first_name + " " + userObj.user_last_name}
                </h2>
              </div>

              <div className="dashboard-body"></div>
            </div>
          </Layout>
        </Fragment>
      ) : (
        <Redirect />
      )}
    </Fragment>
  );
}
