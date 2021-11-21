import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from '../store/actions'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Alert from './Alert'
import { post_request } from '../utils'

const Welcome = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [ btnStyle, setBtnStyle ] = useState('btn__locked')
  const [ serverResCode, setServerResCode ] = useState(200)
  const [ formValues, setFormValues ] = useState({
    'email': '',
    'password': ''
  })

  const logInHandler = async event => {
    if(btnStyle === 'btn__locked') {
      event.preventDefault();
      return;
    }
    
    const { email, password } = formValues

    const data = await post_request('/api/user', { email: email, password: password })
  
    if(data.status === 200) {
      dispatch(userActions.setUser(data.user))
      router.replace(`${router.route}admin`)
    } else {
      setServerResCode(data.status)
    }
  }

  const formHandler = event => {
    const { id, value } = event.target

    setFormValues(prev => {
      return {
        'email': id === 'email' ? value : prev.email,
        'password': id === 'password' ? value : prev.password,
      }
    })
  }

  const verifyFields = () => {
    const { email, password } = formValues
    if(email !== '' && password !== '') {
      setBtnStyle('btn__active')
    } else {
      setBtnStyle('btn__locked')
    }
  }

  return (
    <div className="welcome__container">
      <div className='welcome__form'>
          <h2>Log in to your account</h2>

          <label htmlFor='email'>Email Address</label>
          <input type='email' id='email' onKeyUp={ verifyFields } onChange={ formHandler } required/>

          <label htmlFor='password'>Password</label>
          <input type='password' id='password' onKeyUp={ verifyFields } onChange={ formHandler } required/>

          <button className={ btnStyle } onClick={ logInHandler }>Log In</button>

          <p>
            Do not have an account yet?&nbsp; 
            <Link href='/admin'>
              <a className='link'>Sign Up</a>
            </Link>
          </p>

          { serverResCode !== 200 && <Alert /> }
      </div>
      <div className='welcome__image'>
        <object type='image/svg+xml' data='/image.svg'></object>
      </div>
    </div>
  );
}

export default Welcome;
