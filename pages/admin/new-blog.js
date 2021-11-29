import React from 'react'
import { useSelector } from 'react-redux'
const Layout = React.lazy(() => import('../../components/LayoutAdmin'))
const BlogForm = React.lazy(() => import('../../components/BlogFormAdmin'))

const NewBlog = () => {
    const user = useSelector(state => state.user).user

    return (
        <Layout>
            <BlogForm user={ user }/>
        </Layout>
    )
}

export default NewBlog