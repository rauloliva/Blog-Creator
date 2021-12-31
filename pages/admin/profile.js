import React, { useEffect, Fragment } from "react";
const Layout = React.lazy(() => import("../../components/LayoutAdmin"));
import Unauthorized from "./401";
import Loading from "../../components/Loading";
const ProfileForm = React.lazy(() =>
  import("../../components/ProfileFormAdmin")
);
import { useAuthenticate } from "../../utils";

const Profile = () => {
  const access_token = localStorage.getItem("access_token");
  const [user, notAuth, authenticate] = useAuthenticate(access_token);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return (
    <Fragment>
      {user.user_id && (
        <Layout>
          <ProfileForm user={user} />
        </Layout>
      )}

      {notAuth && <Unauthorized />}

      {!user.user_id && !notAuth && <Loading />}
    </Fragment>
  );
};

export default Profile;
