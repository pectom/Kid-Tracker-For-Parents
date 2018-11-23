import React from 'react';

class Logging extends React.Component {
    render() {
        return (
            <div>
                <div className="ui segment">
                    <form className="ui form">
                        <div className="field">
                            <label>Nazwa</label>
                            <div className="two fields">
                                <div className="field">
                                    <input name="name" type="text" placeholder="Imię" />
                                </div>
                                <div className="field">
                                    <input name="surname" type="text" placeholder="Nazwisko" />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input name="email" type="text" placeholder="ty@przyklad.pl" />
                        </div>
                        <div className="field">
                            <label>Hasło</label>
                            <div className="two fields">
                                <div className="field">
                                    <input name="passwordOne" type="password" />
                                </div>
                                <div className="field">
                                    <input name="passwordTwo" type="password" />
                                </div>
                            </div>
                        </div>
                        <a className="ui button primary" type="submit" href="/dashboard">Zarejestruj</a>
                    </form>
                </div>    
            </div>
        );
    }
}

export default Logging;