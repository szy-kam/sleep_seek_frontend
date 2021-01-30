import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import style from './reservationsForm.css'

const ReservationFormEditable = (props) => {

    const [reservation, setReservation] = useState(props.reservation)

    const { t } = useTranslation()

    const handleInput = (event, field) => {
        const newInputs = {
            ...reservation
        };

        if (["fullName", "phoneNumber"].indexOf(field) >= 0)
            newInputs.customer[field] = event.target.value;
        if (["confirmed", "completed"].indexOf(field) >= 0)
            newInputs[field] = !newInputs[field];
        else newInputs[field] = event.target.value;

        setReservation(newInputs);
    };

    const handleSubmit = () => {
        props.handleSubmit(reservation)
    }

    const handleDelete = () => {
        props.handleDelete(reservation)
    }

    return (
        <tr className={style.reservation}>
            <td>{reservation.createdAt}</td>
            <td><Link to={`/stays/${reservation.stayId}`}>{reservation.stayId}</Link></td>
            <td>{reservation.accommodationId}</td>
            <td><input type="date" value={reservation.dateFrom} onChange={(event) => handleInput(event, "dateFrom")} ></input></td>
            <td><input type="date" value={reservation.dateTo} onChange={(event) => handleInput(event, "dateTo")}></input></td>
            <td><input type="text" value={reservation.customer.fullName} onChange={(event) => handleInput(event, "fullName")}></input></td>
            <td><input type="text" value={reservation.customer.phoneNumber} onChange={(event) => handleInput(event, "phoneNumber")}></input></td>
            <td><input type="checkbox" checked={reservation.confirmed} onChange={(event) => handleInput(event, "confirmed")}></input></td>
            <td><input type="checkbox" checked={reservation.completed} onChange={(event) => handleInput(event, "completed")}></input></td>
            { props.handleSubmit ? <td><button onClick={handleSubmit}>{t('SAVE')}</button></td> : null}
            { props.handleDelete ? <td><button onClick={handleDelete}>{t('DELETE')}</button></td> : null}
        </tr >
    )
}

export default ReservationFormEditable