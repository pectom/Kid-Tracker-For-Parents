import React from 'react';

class RegisterField extends React.Component {
    renderError({error, touched}) {
        if(touched && error) {
            return (
                <div id={`alert-register-${error}`} className="ui red message" >
                    {error}
                </div>
            );
        }
    }

    render() {
        return (
            <div className="field">
                <label>{this.props.label}</label>
                <input id={this.props.id} {...this.props.input} type={this.props.type} />
                <div>{this.renderError(this.props.meta)}</div>
            </div>
        );
    }
}

export default RegisterField;