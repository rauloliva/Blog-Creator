const pgp = require('pg-promise')({ noWarnings: true })

const db = pgp(`postgres://rauloliva:raulito10@localhost:5433/blog_creator`)

const getBlogs = async (req, res) => {
    const method = req.method
    
    if(method === 'GET') {
        const response = await retrieveBlog(req)
        res.status(response.status).json(response)
    }

    else if(method === 'PUT') {
        const response = await updateBlog(req)
        res.status(response.status).json(response)
    }

    else {
        return res.status(405).json({ message: 'This endpoint only uses POST method' });
    }
}

const retrieveBlog = async req => {
    let response
    try {
        const code = req.query.code
        const blog = await db.any(`SELECT * FROM public."Blogs" WHERE blog_code = '${code}'`)
        console.log('blog ', blog[0]);
        response = { status: 200, blog: blog[0] }
    }
    catch(err) {
        response = {
            status: 500,
            message: err.message
        }
    }
    return response
}

const updateBlog = async req => {
    let response
    try {
        const code = req.query.code
        const { title, introduction, body, conclusion  } = JSON.parse(req.body)
        let newCode = code
        if(!validateTitle(code, title)) {
            newCode = generateBlogCode(title)
        }
        await db.none(`UPDATE public."Blogs" SET blog_code = '${newCode}', blog_title = '${title}', blog_introduction = '${introduction}',
         blog_body = '${body}', blog_conclusion = '${conclusion}' WHERE blog_code = '${code}'`)
        
        response = { status: 200, blog_title: title, blog_code: newCode }
    }
    catch(err) {
        response = {
            status: 500,
            message: err.message
        }
    }
    return response
}

const validateTitle = (code, title) => {
    const currentCode = code.split('-').slice(0, -1).join('-')
    const currentTitle = title.toUpperCase().replace(/ /g, '-')
    return currentCode === currentTitle
}

const generateBlogCode = title => { 
    const random_num = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    return title.toUpperCase().replace(/ /g, '-') + '-' + random_num
}

export default getBlogs