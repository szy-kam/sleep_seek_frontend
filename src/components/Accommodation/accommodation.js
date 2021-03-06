import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { GetAccommodationsByStayIdRepository } from '../../repository/stay'
import style from './accommodation.css'
import { withTranslation } from "react-i18next";
import Properties from '../Properties/properties'

class Accommodation extends Component {
    state = {
        accommodations: [],
        dateRange: this.props.dateRange
    }

    getAccommodations = (dateRange) => {
        GetAccommodationsByStayIdRepository(this.props.stayId, dateRange)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else return []
            })
            .then(data => {
                this.setState({ accommodations: data })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        if (this.props.dateRange.to) {
            this.getAccommodations(this.props.dateRange)
        }
        else {
            this.getAccommodations()
        }
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.dateRange) !== JSON.stringify(this.props.dateRange)) {
            if (this.props.dateRange.to) {
                this.getAccommodations(this.props.dateRange)
            }
            else {
                this.getAccommodations()
            }
        }

    }

    renderAccommodation = () => {
        const { t } = this.props;
        return this.state.accommodations.map((item, i) => (
            <tr className={item.reservable ? style.accommodation : style.accommodationEmpty} key={i}>
                <td>{item.sleepersCapacity}{t("ACCOMMODATION_CAPACITY_PERSONS")}</td>
                <td><Properties properties={item.properties} /></td>
                <td>{item.quantity}</td>
                <td>{item.price} {t('CURRENCY_SYMBOL')}</td>
                {item.reservable ? <td><Link to={`/reservation/${item.stayId}/${item.id}`}><button className={style.bookButton}>{t('BOOK_IT')}</button></Link></td> : <td>{t("UNAVAILABLE")}</td>}
            </tr>
        ))

    }

    renderComponent = () => {
        const { t } = this.props;
        if (this.state.accommodations.length) {
            return <table className={style.accommodationTable}>
                <thead>
                    <tr>
                        <td>{t('ROOM')}</td>
                        <td>{t('PROPERTIES')}</td>
                        <td>{t('QUANTITY')}</td>
                        <td>{t('PRICE')}</td>
                        <td>{t('BOOK_IT')}</td>
                    </tr>
                </thead>
                <tbody>
                    {this.renderAccommodation()}
                </tbody>
            </table>
        }
        else return t("NO_ACCOMMODATIONS")
    }

    render() {

        return (
            <div className={style.accommodationComponent}>
                {this.renderComponent()}
            </div>
        )
    }
}
export default withTranslation()(Accommodation)