const pgp = require('pg-promise')({ noWarnings: true })

const db = pgp(`postgres://rauloliva:raulito10@localhost:5433/blog_creator`)

const retrieveAllCodes = async (req, res) => {
    const method = req.method
    
    if(method === 'GET') {
        const response = await retrieveBlogs()
        res.status(response.status).json(response)
    } 

    else {
        return res.status(405).json({ message: 'This endpoint only uses POST method' });
    }
}

const retrieveBlogs = async () => {
    let response
    try {
        const blog = await db.any(`SELECT blog_code FROM public."Blogs"`)
        response = { status: 200, blog_codes: blog }
    }
    catch(err) {
        response = {
            status: 500,
            message: err.message
        }
    }
    return response
}

export default retrieveAllCodes