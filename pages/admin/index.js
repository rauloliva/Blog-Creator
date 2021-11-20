import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '../../store/actions'
const Redirect = React.lazy(() => import('./Redirect'))

export default function Admin()  {
    const dispatch = useDispatch()
    const router = useRouter()

    const user = useSelector(state => state.user)

    const logOutHanlder = () => {
        dispatch(userActions.setUser(null))
        router.push('/')
    }

    return (
        <Fragment>
            { user.isAuthenticated ? (
                <Fragment>
                    <div className='nav__container'></div>
                    <nav className='admin__nav'>
                        <Link href="/admin/my-blogs">
                            <a className='link'>My Blogs</a>
                        </Link>
                        
                        <Link href="/admin/new-blog">
                            <a className='link'>New Blog</a>
                        </Link>

                        <Link href="/admin/profile">
                            <a className='link'>My Profile</a>
                        </Link>

                        <button onClick={logOutHanlder}>
                            Log Out
                        </button>
                    </nav>
                    <p>New Blog Admin</p>
                </Fragment>
            ) : <Redirect /> }
            
        </Fragment>
    )
}