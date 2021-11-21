import React from 'react';
import { useSelector } from 'react-redux';
const NavBar = React.lazy(() => import('../../components/NavbarAdmin'))
const Layout = React.lazy(() => import('../../components/LayoutAdmin'))
const ProfileForm = React.lazy(() => import('../../components/ProfileFormAdmin'))
const Modal = React.lazy(() => import('../../components/Modal'))

const Profile = () => {
    const user = useSelector(state => state.user).user

    return (
        <Layout>
            <Modal />
            <NavBar />
            <ProfileForm user={ user }/>
        </Layout>
    );
}

export default Profile