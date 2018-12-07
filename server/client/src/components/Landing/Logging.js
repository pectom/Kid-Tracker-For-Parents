import React from 'react';
import LoginField from './LoginField';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import validEmail from './validEmail';

import * as actions from '../../actions';

class Logging extends React.Component {
    async myLoginUser(values) {
        await this.props.loginUser(values);
        await this.props.fetchUser();
    }
    

    render() {
        return (
            <div>
                <div className="ui segment">
                    <form className="ui form" onSubmit={this.props.handleSubmit(values => console.log('Logujemy'))}>
                        <Field id="login-email" component={LoginField} type="text" label="Email" name="email" />
                        <Field id="login-password" component={LoginField} type="password" label="Hasło" name="password" />
                        <button 
                            id="login-button"
                            className="ui button primary" 
                            type="submit"
                            onClick={() => this.myLoginUser(this.props.formValues)}
                        >
                            Zaloguj
                        </button>
                    </form>
                </div>
                <div className="ui horizontal divider">
                    Lub
                </div>
                <div className="ui segment" style={{textAlign: 'center'}}>
                    <a id="google-button" className="ui google plus button" href="/auth/google">
                        <i className="google icon" />
                        Zaloguj z Google
                    </a>
                </div>
                
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = "Wpisz email";
    }
    if (!validEmail(values.email)) {
        errors.email = "Email niepoprawny";
    }
    if (!values.password) {
        errors.password = "Wpisz hasło";
    }

    return errors;
}

function mapStateToProps({ form, auth }) {
    return { 
        formValues: form.loggingForm.values,
        auth
    };
}

export default reduxForm({
    validate,
    form: 'loggingForm'
})(connect(mapStateToProps, actions)(Logging));