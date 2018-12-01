import React from 'react';
import LoginField from './LoginField';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import validEmail from './validEmail';

import * as actions from '../../actions';

class Logging extends React.Component {
    render() {
        return (
            <div>
                <div className="ui segment">
                    <form className="ui form" onSubmit={this.props.handleSubmit(values => console.log('Logujemy'))}>
                        <Field component={LoginField} type="text" label="Email" name="email" />
                        <Field component={LoginField} type="password" label="Hasło" name="password" />
                        <button 
                            className="ui button primary" 
                            type="submit"
                            onClick={() => {this.props.loginUser(this.props.formValues)}}
                        >
                            Zaloguj
                        </button>
                    </form>
                </div>
                <div className="ui horizontal divider">
                    Lub
                </div>
                <div className="ui segment" style={{textAlign: 'center'}}>
                    <a className="ui google plus button" href="/auth/google">
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

function mapStateToProps(state) {
    return { formValues: state.form.loggingForm.values };
}

export default reduxForm({
    validate,
    form: 'loggingForm'
})(connect(mapStateToProps, actions)(Logging));