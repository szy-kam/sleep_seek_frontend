import React from 'react'
import { withTranslation } from "react-i18next";
import style from './component404.css'
import { Link } from "react-router-dom"

const Component404 = (props) => {
    const { t } = props
    return (
        <div className={style.Component404}>
            <div className={style.number}>
                404
            </div>
            <div className={style.text}>
                {t('404')}
            </div>
            <Link to={"/"}><button>{t('BACK_TO_HOMEPAGE')}</button></Link>
        </div>
    )
}
export default withTranslation()(Component404)
