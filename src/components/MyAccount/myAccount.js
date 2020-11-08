import React from 'react';
import { Link } from 'react-router-dom';
//import style from './myAccount.css'

const MyAccount = (props) => {
    return (
        <div>
            My Account
            <Link to="/add-stay">Add stay</Link>
        </div>
    )
}

export default MyAccount;