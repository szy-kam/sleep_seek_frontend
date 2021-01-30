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
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    this.props.redirectUser("/my-account")
                }
            })
            .then(data => {
                if (data.length === 0) {
                    this.props.history.push("/my-account")
                }
                else{
                    this.setState({ reservations: data })
                }
                
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