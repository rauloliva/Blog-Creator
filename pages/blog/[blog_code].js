import React, { Fragment } from 'react'
import { request } from '../../utils'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import BlogContent from '../../components/Blog'
import { global } from '../../utils'

const Blog = props => (
    <Fragment>
        <div className='blog__box'>
            <NavBar />
            
            <BlogContent blog={ props.blog } author={ props.author }/>
            
            <Footer />
        </div>
    </Fragment>
)

export async function getStaticPaths() {
    const res = await request(`${global.API_URL}blog/blog_code`, 'GET')
    const paths = res.blog_codes.map(blog => ({
        params: {
            blog_code: blog.blog_code
        }
    }))

    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps(path) {
    const blog_code = path.params.blog_code
    let blog = {}, author = {}

    const fetchAuthor = async () => {
        const res = await request(`${global.API_URL}user/${blog.blog_user_id}`, 'GET')
        if(res.status === 200) {
            author = res.user
        }
    }
    
    const fetchBlog = async () => {
        const response = await request(`${global.API_URL}blog/blog_code/${blog_code}`, 'GET');
        if(response.status === 200) {
            blog = response.blog
        }
    }

    await fetchBlog()
    await fetchAuthor()

    return {
        props: {
            blog: blog,
            author: author
        },
        revalidate: 10
    }
}

export default Blog