import React, { Component } from 'react'
import ReservationsForm from '../ReservationsForm/reservationsForm'
import { GetReservationsByStayIdRepository, EditReservationRepository, DeleteReservationRepository } from '../../repository/stay'
import { withTranslation } from "react-i18next";
import style from './reservationsEdit.css'
import { Link } from 'react-router-dom';

class ReservationsEdit extends Component {
    state = {
        reservations: null
    }

    getReservations = () => {
        this.setState({ Reservations: null })
        GetReservationsByStayIdRepository(this.props.match.params.stayId)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    data = null
                }
                this.setState({ reservations: data })
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getReservations()
    }

    handleSubmit = async (reservation) => {
        await EditReservationRepository(reservation)
            .then(() => this.getReservations())
            .catch(err => console.log(err))

        // this.getReservations()
    }

    handleDelete = async (reservation) => {
        await DeleteReservationRepository(reservation)
            .then(() => {
                this.getReservations()
            })
            .catch(err => console.log(err))
    }

    renderForms = () => {
        return <ReservationsForm reservations={this.state.reservations} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete} />
        // if (Array.isArray(this.state.reservations)) {
        //     return this.state.reservations.map((item, i) => (
        //     ))
        // }
        // else {
        //     return this.props.t('NO_RESERVATIONS')
        // }
    }

    render() {
        const { t } = this.props;
        return (
            <div className={style.reservationsEditComponent}>
                <h3>{t('MANAGE_RESERVATIONS')}</h3>
                <p>{t('SAVE_RESERVATIONS_REMAINDER')}</p>
                <div className={style.reservationsForms}>
                    {this.renderForms()}
                </div>

                <Link to={`/stays/${this.props.match.params.stayId}`} className={style.goToStayButton}><button >{t('GO_TO_STAY')}</button></Link>
            </div>
        )
    }
}
export default withTranslation()(ReservationsEdit)