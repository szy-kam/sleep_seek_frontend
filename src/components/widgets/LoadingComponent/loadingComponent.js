import React from 'react'
import style from './loadingComponent.css'

const LoadingComponent = (props) => {


    return (
        <div className={style.loadingComponent}>
            <div className={style.loadingio}>
                <div className={style.ldio}>
                    <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingComponent
