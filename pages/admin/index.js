import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
const Redirect = React.lazy(() => import('./Redirect'))
const Layout = React.lazy(() => import('../../components/LayoutAdmin'))

export default function Admin()  {
    const user = useSelector(state => state.user)

    return (
        <Fragment>
            { user.isAuthenticated ? (
                <Fragment>
                    <Layout>
                        <div>
                            <h2>Welcome View</h2>
                        </div>
                    </Layout>
                </Fragment>
            ) :
            <Redirect /> }
            
        </Fragment>
    )
}