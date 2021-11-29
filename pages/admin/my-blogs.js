import React from 'react';
import { useSelector } from 'react-redux'
const Layout = React.lazy(() => import('../../components/LayoutAdmin'))
const MyBlogsList = React.lazy(() => import('../../components/MyBlogs'))

const MyBlogs = () => {
    const user = useSelector(state => state.user).user

    return (
        <Layout>
            <MyBlogsList user={ user }/>
        </Layout>
    );
}

export default MyBlogs