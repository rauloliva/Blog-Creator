import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Alert from './Alert'

const Welcome = () => {
  const router = useRouter()

  const [ btnStyle, setBtnStyle ] = useState('btn__locked')
  const [ formValues, setFormValues ] = useState({
    'email': '',
    'password': ''
  })
  const [ serverResCode, setServerResCode ] = useState(200)

  const logInHandler = async event => {
    if(btnStyle === 'btn__locked') {
      event.preventDefault();
      return;
    }
    
    const { email, password } = formValues

    const getCircularReplacer = () => {
      const seen = new WeakSet()
      return (__, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return
          }
          seen.add(value)
        }
        return value
      }
    }

    const response = await fetch('/api/login/user', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }, getCircularReplacer())
    })

    const data = await response.json()
    if(data.status !== 200) {
      setServerResCode(401)
    } else {
      router.replace(`${router.route}/admin`)
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
        <object type='image/svg+xml' data='/image.svg' width='1300'></object>
      </div>
    </div>
  );
}

export default Welcome;
