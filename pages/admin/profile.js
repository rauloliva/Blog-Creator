import React from 'react';
import { useSelector } from 'react-redux'
const Layout = React.lazy(() => import('../../components/LayoutAdmin'))
const ProfileForm = React.lazy(() => import('../../components/ProfileFormAdmin'))

const Profile = () => {
    const user = useSelector(state => state.user).user

    return (
        <Layout>
            <ProfileForm user={ user }/>
        </Layout>
    );
}

export default Profile