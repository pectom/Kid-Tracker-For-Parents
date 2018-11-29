import React from 'react';
import { Link } from 'react-router-dom';

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
                        <Link className="ui button primary" type="submit" to="/dashboard">Zaloguj</Link>
                    </form>
                </div>
                <div className="ui horizontal divider">
                    Lub
                </div>
                <div className="ui segment" style={{textAlign: 'center'}}>
                    <Link class="ui google plus button" to="/dashboard">
                        <i class="google icon" />
                        Zaloguj z Google
                    </Link>
                </div>
                
            </div>
        );
    }
}

export default Logging;