import React from 'react';

class Logging extends React.Component {
    render() {
        return (
            <div>
                <div className="ui segment">
                    <form className="ui form">
                        <div className="field">
                            <label>Email</label>
                            <input name="email" type="text" />
                        </div>
                        <div className="field">
                            <label>Hasło</label>
                            <input name="password" type="password" />
                        </div>
                        <a className="ui button primary" type="submit" href="/dashboard">Zaloguj</a>
                    </form>
                </div>
                <div className="ui horizontal divider">
                    Lub
                </div>
                <div className="ui segment" style={{textAlign: 'center'}}>
                    <a class="ui google plus button" href="/dashboard">
                        <i class="google icon" />
                        Zaloguj z Google
                    </a>
                </div>
                
            </div>
        );
    }
}

export default Logging;