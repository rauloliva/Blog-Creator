import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { userActions } from '../store/actions';

const NavbarAdmin = () => { 
    const dispatch = useDispatch()
    const router = useRouter()
    
    const logOutHanlder = () => {
        dispatch(userActions.setUser(null))
        router.push('/')
    }

    return (
        <div className='nav__options'>
            <h1>Welcome</h1>

            <Link href="/admin/profile">
                <a className='btn__link'>My Profile</a>
            </Link>

            <Link href="/admin/new-blog">
                <a className='btn__link'>Create New Blog</a>
            </Link>

            <Link href="/admin/my-blogs">
                <a className='btn__link'>My Blogs</a>
            </Link>

            <button className='btn__active btn__color-p-s mt2' onClick={ logOutHanlder }>
                Log Out
            </button>
        </div>
    )
}

export default NavbarAdmin