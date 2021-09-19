import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function  NewBlog()  {
    const router = useRouter()

    useEffect(() => {
        const user = false
        if(user) {
            router.push(`${router.route}/login`)
        }
    }, [router])

    return (
        <Fragment>
            <p>New Blog Admin</p>
        </Fragment>
    )
}

// export default 