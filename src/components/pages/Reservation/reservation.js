import React, { useEffect, useState } from 'react'
import style from './reservation.css'
import { withTranslation } from "react-i18next";
import { STAY } from '../../../config'
import { GetStayByIdRepository, GetAccommodationByIdRepository } from '../../../repository/stay'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";

const Reservation = (props) => {

    const accomodationInit = {
        id: null,
        stayId: null,
        sleepersCapacity: null,
        quantity: null,
        price: null
    }

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });
    const [stay, setStay] = useState(STAY);
    const [accomodation, setAccomodation] = useState(accomodationInit);

    useEffect(() => {
        GetStayByIdRepository(props.match.params.stayId)
            .then((stay) => {
                if (stay) { setStay(stay) }
                else {
                    props.history.push("/404");
                }
            });

        GetAccommodationByIdRepository(props.match.params.accomodationId)
            .then((response) => {
                if (response.ok) {
                    setAccomodation(response)
                }
                else {
                    props.history.push("/404");
                }
            })

    }, [props.history, props.match.params.accomodationId, props.match.params.stayId]);

    const renderStay = () => {
        return (
            <div className={style.stay}>
                <div>
                    <div>{stay.name}</div>
                    <div>{stay.mainPhoto}</div>
                    <div>{t('SLEEPERS_CAPACITY')}:{accomodation.sleepersCapacity}</div>
                    <div>{t('PRICE')}: {accomodation.price}</div>
                </div>
            </div>
        )
    }

    const renderDatePick = () => {
        return (
            <div>
                {t('CHOOSE_DATE')}
                <Calendar
                    value={selectedDayRange}
                    onChange={setSelectedDayRange}
                    shouldHighlightWeekends
                    minimumDate={utils().getToday()}
                    locale={myCustomLocale}
                />
                {selectedDayRange.from ? <div>{t('FROM')} {selectedDayRange.from.day}.{selectedDayRange.from.month}.{selectedDayRange.from.year}</div> : null}
                {selectedDayRange.to ? <div>{t('TO')} {selectedDayRange.to.day}.{selectedDayRange.to.month}.{selectedDayRange.to.year}</div> : null}
                {selectedDayRange.from && selectedDayRange.to ? <div>{t('DAY_AMOUNT')}: {calculateDateDifference()}</div> : null}
                {selectedDayRange.from && selectedDayRange.to ? <div>{t('WHOLE_PRICE')}: {calculatePrice()}</div> : null}
            </div>
        )
    }

    const calculateDateDifference = () => {
        if (selectedDayRange.from && selectedDayRange.to) {
            const from = myCustomLocale.toNativeDate(selectedDayRange.from)
            const to = myCustomLocale.toNativeDate(selectedDayRange.to)
            const diffInMs = to - from
            return diffInMs / (86400000);
        }
    }

    const calculatePrice = () => {
        if (selectedDayRange.from && selectedDayRange.to) {
            const dateDiff = calculateDateDifference()
            return dateDiff * accomodation.price
        }
    }

    const { t } = props;
    return (
        <div className={style.ReservationComponent}>
            {renderStay()}
            {renderDatePick()}
        </div>
    )
}
export default withTranslation()(Reservation)

export const myCustomLocale = {
    // months list by order
    months: [
        'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
    ],

    // week days by order
    weekDays: [
        {
            short: 'P',
        },
        {
            short: 'W',
        },
        {
            short: 'Ś',
        },
        {
            short: 'C',
        },
        {
            short: 'P',
        },
        {
            short: 'S',
            isWeekend: true,
        },
        {
            short: 'S',
            isWeekend: true,
        }
    ],

    // just play around with this number between 0 and 6
    weekStartingIndex: 1,

    from: 'od',
    to: 'do',
    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
        return gregorainTodayObject;
    },

    // return a native JavaScript date here
    toNativeDate(date) {
        return new Date(date.year, date.month - 1, date.day);
    },

    // return a number for date's month length
    getMonthLength(date) {
        return new Date(date.year, date.month, 0).getDate();
    },

    // return a transformed digit to your locale
    transformDigit(digit) {
        return digit;
    },

    digitSeparator: ',',
}