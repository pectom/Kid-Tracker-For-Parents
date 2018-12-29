import React from 'react';
import RegisterField from './RegisterField';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import validEmail from './validEmail';

import * as actions from '../../actions';

class Register extends React.Component {
    async myRegisterUser(values) {
        await this.props.registerUser(values);
    }

    renderMessage() {
        if(this.props.submitSucceeded){
            return (
                <div className="ui success message visible">
                    <div className="header">
                        Zostałeś zarejestrowany
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div className="ui segment">
                    <form className="ui form" onSubmit={this.props.handleSubmit((values) => this.myRegisterUser(values))} >
                        <div className="field">
                            <div className="two fields">
                                <Field id="register-name" component={RegisterField} type="text" label="Imię" name="firstName" />
                                <Field id="register-surname" component={RegisterField} type="text" label="Nazwisko" name="lastName" />
                            </div>
                        </div>
                        <Field id="register-email" component={RegisterField} type="text" label="Email" name="email" />
                        <div className="field">
                            <div className="two fields">
                                <Field id="register-password" component={RegisterField} type="password" label="Hasło" name="password" />
                                <Field id="register-password2" component={RegisterField} type="password" label="Powtórz hasło" name="passwordTwo" />
                            </div>
                        </div>
                        {this.renderMessage()}
                        <button
                            id="register-button"
                            className="ui button primary" 
                            type="submit"
                        >
                            Zarejestruj
                        </button>
                    </form>
                </div>    
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.firstname) {
        errors.firstname = "Wpisz imię";
    }
    if (!values.lastname) {
        errors.lastname = "Wpisz nazwisko";
    }
    if (!values.email) {
        errors.email = "Wpisz email";
    }
    if (!validEmail(values.email)) {
        errors.email = "Email niepoprawny";
    }
    if (!values.password) {
        errors.password = "Wpisz hasło";
    }
    if (!values.passwordTwo) {
        errors.passwordTwo = "Potwierdź hasło";
    }
    if(values.password !== values.passwordTwo) {
        errors.passwordTwo = "Hasła nie są identyczne";
    }

    return errors;
}

function mapStateToProps({ form }) {
    return { 
        formValues: form.registerForm.values,
    };
}

export default reduxForm({
    validate,
    form: 'registerForm'
})(connect(mapStateToProps, actions)(Register));