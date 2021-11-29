const pgp = require('pg-promise')({ noWarnings: true })

const db = pgp(`postgres://rauloliva:raulito10@localhost:5433/blog_creator`)

const userUpdate = async (req, res) => {
    const method = req.method

    if(method === 'PATCH') {
        const response = await updateUser(req)
        res.status(response.status).json(response)
    }

    else {
        return res.status(405).json({ message: 'This endpoint only uses PATCH method' });
    }
}

const updateUser = async req => {
    let response
    try {
        const { userId } = req.query
        const formData = JSON.parse(req.body)
        const { user_first_name, user_last_name, user_email, user_phone, user_birthday, user_description, user_password } = formData

        await db.none(`UPDATE public."Users" SET user_first_name = '${user_first_name}', user_last_name = '${user_last_name}', user_email = '${user_email}', user_phone = '${user_phone}', user_birthday = '${user_birthday}', user_description = '${user_description}', user_password = '${user_password}' WHERE user_id = ${userId}`)
        
        response = { user: formData, status: 200 }
    } catch (error) {
        if(error.code == 0) {
            response = { message: "User not found", error: error, status: 401 }
        } else {
            response = { message: "Server internal error Eeeee", error: error, status: 500 }
        }
    }
    return response
}

export default userUpdate