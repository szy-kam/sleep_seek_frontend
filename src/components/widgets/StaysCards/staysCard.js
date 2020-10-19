import React from 'react';
import { Link } from 'react-router-dom';

import style from './staysCard.css'

const StaysCard = (props) => {

    return props.stays.map((item,i) =>(
        <div key={i} className={style.staysCard}>
            <div className={style.left}>
                <div className={style.image}><Link to={`/stays/${item.id}`}><img src="https://picsum.photos/150.jpg" alt=""></img></Link></div>
            </div>
            <div className={style.right}>
                <div className={style.name}><Link to={`/stays/${item.id}`}>{item.name}</Link></div>
                <div className={style.address}>Address: {item.address.city}, {item.address.address}</div>
                <div className={style.price}>{item.address.zipCode} zł</div>
                <button className={style.itemButton}><Link to={`/stays/${item.id}`}>View more</Link></button>
            </div>
        </div>

    ))
    // return (
    //     <div>
    //         {console.log(props)}
    //         "alamakota"
    //     </div>
        
    // )
    
    
}

export default StaysCard;