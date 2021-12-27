import React, { useState, useEffect, Fragment, useCallback } from "react";
const Layout = React.lazy(() => import("../../components/LayoutAdmin"));
import { request, global } from "../../utils";
import Redirect from "./Redirect";
import Loading from "../../components/Loading";
import { Logger } from "react-logger-lib";
const ProfileForm = React.lazy(() =>
  import("../../components/ProfileFormAdmin")
);

const Profile = () => {
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
      Logger.of("URI.profile.request").error("Request failed: ", error);
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
          <ProfileForm user={user} />
        </Layout>
      )}

      {notAuth && <Redirect />}

      {!user.user_id && !notAuth && <Loading />}
    </Fragment>
  );
};

export default Profile;
