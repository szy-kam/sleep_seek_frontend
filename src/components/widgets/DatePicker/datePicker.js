import React, { useState } from 'react'
import { myCustomLocale } from '../../pages/Reservation/reservation'
import DataPicker, { utils } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { useTranslation } from "react-i18next";
import style from './datePicker.css'

const DatePicker = (props) => {

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });

    const { t } = useTranslation()

    const selectedDate = (date) => {
        setSelectedDayRange(date)

        let newDate = {}
        newDate.to = dateFormatterToIso(date.to)
        newDate.from = dateFormatterToIso(date.from)
        if (newDate.to || (!newDate.to && !newDate.from))
            props.handleDateSelect(newDate)

    }

    return (
        <div className={style.datePickerComponent}>
            <span>Aby wyświetlić dostępnośc pokoi, wybierz datę pobytu</span>
            <DataPicker
                value={selectedDayRange}
                onChange={selectedDate}
                shouldHighlightWeekends
                minimumDate={utils().getToday()}
                locale={myCustomLocale}
                inputPlaceholder={t('CLICK_HERE')}
                colorPrimary="#278abb"
                colorPrimaryLight="rgb(23 151 211 / 42%)"
                calendarPopperPosition="bottom"
                renderFooter={() => (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            type="button"
                            onClick={() => {
                                selectedDate({
                                    from: null,
                                    to: null
                                })
                            }}
                            style={{
                                padding: '10px 28px',
                            }}
                        >
                            {t('RESET_VALUE')}
                        </button>
                    </div>
                )}
                inputClassName="my-custom-input"
            />
        </div>
    )
}

export default DatePicker

export const dateFormatterToIso = (date) => {
    const fixDate = (date) => {
        if (date < 10) {
            return "0" + date
        }
        else return date
    }
    if (date)
        return `${date.year}-${fixDate(date.month)}-${fixDate(date.day)}`
    else
        return ""
}