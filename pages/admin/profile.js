import React from "react";
import { useSelector } from "react-redux";
const Layout = React.lazy(() => import("../../components/LayoutAdmin"));
const ProfileForm = React.lazy(() =>
  import("../../components/ProfileFormAdmin")
);

const Profile = () => {
  const userObj = useSelector((state) => state.user);
  const user = userObj.user;

  return (
    <Layout>
      <ProfileForm user={user} />
    </Layout>
  );
};

export default Profile;
