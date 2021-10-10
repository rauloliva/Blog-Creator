const pgp = require('pg-promise')({ noWarnings: true })

const db = pgp(`postgres://rauloliva:raulito10@localhost:5433/blog_creator`)

const login = async (req, res) => {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'This endpoint only uses POST method' });
        }

        const { email, password } = JSON.parse(req.body)

        const user = await db.one(`SELECT * FROM public."Users" WHERE user_email = '${email}' AND user_password = '${password}'`)
        res.status(200).json({user, status: 200})

    } catch (error) {
        // Query result is empty
        if(error.code == 0) {
            res.send({ message: "The Credentials are incorrect", error: error, status: 401 })    
        } else {
            res.send({ message: "Server internal error", error: error, status: 500 })
        }
        console.error(error);
    }
}

export default login