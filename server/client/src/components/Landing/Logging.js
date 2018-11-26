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
                        <button className="ui button primary" type="submit">Zaloguj</button>
                    </form>
                </div>
                <div className="ui horizontal divider">
                    Lub
                </div>
                <div className="ui segment" style={{textAlign: 'center'}}>
                    <button class="ui google plus button">
                        <i class="google icon" />
                        Zaloguj z Google
                    </button>
                </div>
                
            </div>
        );
    }
}

export default Logging;