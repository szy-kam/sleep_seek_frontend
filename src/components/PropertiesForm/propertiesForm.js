import React, { useState, useEffect } from 'react';
import { useChecklist } from 'react-checklist';
import { GetAllAccommodationProperties, GetAllStayProperties } from '../../repository/stay'
import style from './propertiesForm.css'
import { useTranslation } from "react-i18next";

export default function PropertiesForm(props) {

    // const [properties, setProperties] = useState(props.properties)
    const [allProperties, setAllProperties] = useState([])

    const { handleCheck, checkedItems } = useChecklist(allProperties, {
        key: 'name',
        keyType: 'string',
    });

    useEffect(() => {
        const getProperties = () => {
            if (Array.isArray(props.properties)) {
                for (let item of props.properties) {
                    checkedItems.add(item)
                }
            }

            if (props.stay && allProperties !== []) {
                GetAllStayProperties()
                    .then(resposne => resposne.json())
                    .then(data => {
                        setAllProperties(data.map(item => {
                            return { name: item, id: item }
                        }))
                    })
            }

            if (props.accommodation && allProperties !== []) {
                GetAllAccommodationProperties()
                    .then(resposne => resposne.json())
                    .then(data => {
                        setAllProperties(data.map(item => {
                            return { name: item, id: item }
                        }))
                    })
            }
        }
        getProperties()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onChange = (e) => {
        handleCheck(e)
        props.handleInput([...checkedItems]);
    }

    const { t } = useTranslation()

    return (
        <div className={style.propertiesFormComponent}>
            <ul>
                {Array.isArray(allProperties) && allProperties.map((v, i) => (
                    <li key={i}>
                        <input
                            type="checkbox"
                            data-key={v.name}
                            onChange={onChange}
                            checked={checkedItems.has(v.name)}
                        />
                        <label>{t(v.name)}</label>
                    </li>
                ))}
            </ul>
        </div>

    );
};