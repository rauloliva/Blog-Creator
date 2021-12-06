import NavBarOptions from './NavBarOptions'

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className='footer'>
            <NavBarOptions section='footer'/>
            <p className='footer__copy'>Raul Oliva &copy; { year }</p>
        </footer>
    )
}

export default Footer