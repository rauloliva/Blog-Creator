const pgp = require('pg-promise')({ noWarnings: true })

const db = pgp(`postgres://rauloliva:raulito10@localhost:5433/blog_creator`)

const userLogin = async (req, res) => {
    const method = req.method

    if(method === 'POST') {
        const response = await login(req)
        res.status(response.status).json(response)
    }

    else {
        return res.status(405).json({ message: 'This endpoint only uses POST method' });
    }
}

const login = async (req) => {
    let response
    try {
        const { email, password } = JSON.parse(req.body)
        const user = await db.one(`SELECT * FROM public."Users" WHERE user_email = '${email}' AND user_password = '${password}'`)
        response = { user, status: 200 }
    } catch (error) {
        if(error.code == 0) {
            response = { message: "The Credentials are incorrect", error: error, status: 401 }
        } else {
            response = { message: "Server internal error", error: error, status: 500 }
        }
    }
    return response
}

export default userLogin