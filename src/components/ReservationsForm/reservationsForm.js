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

        else newInputs[field] = event.target.value;

        setReservation(newInputs);
    };

    const statusOptions = () => {
        const options = ["PENDING", "CONFIRMED", "DECLINED", "INVALID", "COMPLETED"]
        //temporarily
        return options.map((item, i) => {
            return <option key={i} value={item}>{t(item)}</option>;
        });
    }

    const handleSubmit = () => {
        props.handleSubmit(reservation)
    }

    const handleDelete = () => {
        props.handleDelete(reservation)
    }

    const canEdit = () => {
        return (props.reservation.status === "PENDING" && props.username) || !props.username
    }

    const renderLine = () => {
        if (props.reservation) {
            return <tr className={style.reservation}>
                <td>{reservation.createdAt}</td>
                <td><Link to={`/stays/${reservation.stayId}`}>{reservation.stayName}</Link></td>
                <td>{reservation.accommodationId}</td>
                <td>{reservation.dateFrom}</td>
                <td>{reservation.dateTo}</td>
                {!props.username ? <td><select onChange={(event) => handleInput(event, "status")} value={reservation.status} > {statusOptions()} </select></td> : <td>{t(reservation.status)}</td>}
                {canEdit() ? <td><input type="text" value={reservation.customer.fullName} onChange={(event) => handleInput(event, "fullName")}></input></td> : <td>{reservation.customer.fullName}</td>}
                {canEdit() ? <td><input type="text" value={reservation.customer.phoneNumber} onChange={(event) => handleInput(event, "phoneNumber")}></input></td> : <td>{reservation.customer.phoneNumber}</td>}
                {canEdit() ? <td><button onClick={handleSubmit}>{t('SAVE')}</button></td> : <td></td>}
                {canEdit() ? <td><button onClick={handleDelete}>{t('DELETE')}</button></td> : <td></td>}
            </tr >
        }
        else return null;
    }

    return (
        renderLine()
    )
}
export default ReservationFormEditable