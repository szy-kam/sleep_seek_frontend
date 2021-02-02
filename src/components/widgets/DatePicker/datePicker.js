import React, { useState } from 'react'
import { myCustomLocale } from '../../pages/Reservation/reservation'
import DataPicker, { utils } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { useTranslation } from "react-i18next";
const DatePicker = (props) => {

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });

    const { t } = useTranslation()

    const selectedDate = (date) => {
        setSelectedDayRange(date)
        if (date.to)
            props.handleSelect(date)
    }

    return (
        <div>
            <DataPicker
                value={selectedDayRange}
                onChange={selectedDate}
                shouldHighlightWeekends
                minimumDate={utils().getToday()}
                locale={myCustomLocale}
                inputPlaceholder={t('CLICK_HERE')}
                calendarClassName={"style.calendar"}
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
