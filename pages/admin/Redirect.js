import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'

const Redirect = () => {
    const router = useRouter()

    useEffect(() => {
        return router.push('/')
    }, [router])

    return (
        <div>
            <h3>You do not have access</h3>
            <Link href='/'>
                <a>Log In</a>
            </Link>
        </div>
    )
}

export default Redirect