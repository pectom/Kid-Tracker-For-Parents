import React from 'react';
import RegisterField from './RegisterField';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import validEmail from './validEmail';

import * as actions from '../../actions';

class Register extends React.Component {
    render() {
        return (
            <div>
                <div className="ui segment">
                    <form className="ui form" onSubmit={this.props.handleSubmit(values => console.log('Rejestrujemy'))} >
                        <div className="field">
                            <div className="two fields">
                                <Field component={RegisterField} type="text" label="Imię" name="firstName" />
                                <Field component={RegisterField} type="text" label="Nazwisko" name="lastName" />
                            </div>
                        </div>
                        <Field component={RegisterField} type="text" label="Email" name="email" />
                        <div className="field">
                            <div className="two fields">
                                <Field component={RegisterField} type="password" label="Hasło" name="password" />
                                <Field component={RegisterField} type="password" label="Powtórz hasło" name="passwordTwo" />
                            </div>
                        </div>
                        <button 
                            className="ui button primary" 
                            type="submit" 
                            onClick={() => this.props.registerUser(this.props.formValues)} 
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

function mapStateToProps(state) {
    return { formValues: state.form.registerForm.values };
}

export default reduxForm({
    validate,
    form: 'registerForm'
})(connect(mapStateToProps, actions)(Register));