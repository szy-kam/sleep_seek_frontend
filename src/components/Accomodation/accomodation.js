import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { GetAccomodationByStayId } from '../../repository/stay'
import style from './accomodation.css'
import { withTranslation } from "react-i18next";
import Properties from '../Properties/properties'

class Accomodation extends Component {
    state = {
        accomodations: []
    }

    componentDidMount() {
        if (this.props.stayId) {
            GetAccomodationByStayId(this.props.stayId).then((response) => {
                this.setState({ accomodations: response })
            })
        }
        else
            this.setState({ accomodations: [{}] })
    }

    renderAccomodation = (item, i) => {
        const { t } = this.props;
        return <tr className={style.accomodation} key={i}>
            <td>{item.sleepersCapacity}</td>
            <td><Properties accomodationId={item.id} /></td>
            <td>{item.quantity}</td>
            <td>{item.price} {t('CURRENCY_SYMBOL')}</td>
            <td><Link to={`/book/${item.stayId}/${item.id}`}>{t('BOOK_IT')}</Link></td>
        </tr>
    }

    render() {
        const { t } = this.props;
        return (
            <div className={style.accomodationComponent}>
                <table>
                    <tr>
                        <td>{t('SLEEPERS_CAPACITY')}</td>
                        <td>{t('PROPERTIES')}</td>
                        <td>{t('QUANTITY')}</td>
                        <td>{t('PRICE')}</td>
                        <td>{t('BOOK_IT')}</td>
                    </tr>
                    {this.state.accomodations.map((item, i) => (
                        this.renderAccomodation(item, i)
                    ))}
                </table>
            </div>
        )
    }
}
export default withTranslation()(Accomodation)