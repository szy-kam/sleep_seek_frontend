import React from 'react'
import style from './popupComponent.css'

const PopupComponent = (props) => {
    return (
        <div className={style.popupComponent}>
            {props.children}
        </div>
    )
}

export default PopupComponent