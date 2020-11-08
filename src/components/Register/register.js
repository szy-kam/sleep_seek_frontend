import React, { Component } from 'react';
import { AddUserRepo } from '../../repository/user';
//import { Link } from 'react-router-dom';

import style from './register.css'

class Register extends Component {

        state = {
                form: {
                        username:"",
                        password: "",
                },
                message: null
        }

        handleInput = (event,field) => {
                const newForm= {
                    ...this.state.form
                }
                newForm[field] = event.target.value
        
                this.setState({
                    form:newForm
                })
        }

        submitForm = (e) => {
                e.preventDefault();
                console.log(this.state);
                AddUserRepo(this.state.form).then( ()=> this.setState({message: "Account created"}))
        }

        redirectUser = () => {
                setTimeout(()=>{
                        this.props.history.push('/sign-in')
                },3000)
        }
        
        message = () => {
                if (this.state.message)
                        return <div className={style.message}> {this.state.message} {this.redirectUser()} </div>
                else
                        return null
        }

        render(){
                return(
                        <div className={style.registerComponent}>
                                {this.message()}
                                <form onSubmit={this.submitForm} className={style.registerForm}>
                                        <input type="text" placeholder="Username" value={this.state.form.username} onChange={(event)=>this.handleInput(event,'username')}/>
                                        <input type="password" placeholder="Password" value={this.state.form.password} onChange={(event)=>this.handleInput(event,'password')} autoComplete="off"/>
                                        <button type="submit">Register</button>
                                </form>
                        </div>
                )
        }
}
export default Register
