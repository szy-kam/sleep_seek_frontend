import React, { Component } from 'react'
import { GetStayPropertiesById, GetAccommodationPropertiesById } from '../../repository/stay'
import style from './properties.css'
import { withTranslation } from "react-i18next";
import 'font-awesome/css/font-awesome.min.css';

class Properties extends Component {
    state = {
        properties: []
    }

    componentDidMount() {
        if (this.props.stayId) {
            GetStayPropertiesById(this.props.stayId).then((response) => {
                this.setState({ properties: response })
            })
        }
        if (this.props.accommodationId) {
            GetAccommodationPropertiesById(this.props.accommodationId).then((response) => {
                this.setState({ properties: response })
            })
        }
    }

    renderProperties = () => {
        return this.state.properties.map((item, i) => (
            <div className={style.property} key={i}>
                <i className={`fa fa-${item.ico}`}></i>
                {item.name}
            </div>
        ))
    }

    render() {
        return (
            <div className={style.propertiesComponent}>
                {this.renderProperties()}
            </div>
        )
    }
}
export default withTranslation()(Properties)