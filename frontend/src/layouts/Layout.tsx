import React from 'react'
import Header from '../components/layouts/Header'


interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className='min-h-screen font-sans'>
            <Header />
            <div className='container'>
                {children}
            </div>
        </div>


    )
}

export default Layout