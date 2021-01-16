import React, { Component } from 'react'
import { GetStayPropertiesById, GetAccomodationPropertiesById } from '../../repository/stay'
import style from './properties.css'
import { withTranslation } from "react-i18next";

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
        if (this.props.accomodationId) {
            GetAccomodationPropertiesById(this.props.accomodationId).then((response) => {
                this.setState({ properties: response })
            })
        }
    }

    renderProperties = () => {
        return this.state.properties.map((item, i) => (
            <div className={style.property} key={i}>
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