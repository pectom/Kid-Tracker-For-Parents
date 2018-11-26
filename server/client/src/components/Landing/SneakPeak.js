import React from 'react';

class SneakPeak extends React.Component {
    render() {
        return (
            <div>
                <div className="ui segment">
                    <h4><i class="angle right icon" />Chcesz zadbać o bezpieczeństwo swojego dziecka?</h4>
                    <p>Możesz zaufać naszemu systemowi lokalizacji, który poinformuje Cię jeśli Twoje dziecko opuści miejsce w którym powinno się znajdować.</p>
                    <h4><i class="angle right icon" />GdzieJestMojeDziecko? jest bardzo przyjazną aplikacją.</h4>
                    <p>Bardzo łatwo i szybko zdefiniujesz miejsca pobytu Twojego dziecka, takie jak szkoła, basen, dom, mieszkanie babci. Intuicyjnie dodasz, usuniesz, wyłączysz reguły powiadomień.</p>
                    <h4><i class="angle right icon" />Zostaniesz szybko poinformowany o sytuacji niezaplanowanej.</h4>
                    <p>Jeśli Twoje dziecko opuści zaplanowany obszar, otrzymasz natychmiast powiadomienie na swój telefon.</p>
                </div>
                <div className="ui segment" style={{textAlign: 'center'}}>
                    <i 
                        className="map outline icon huge" 
                        style={{display: 'inline-block', verticalAlign: 'middle'}} 
                    />
                </div>
            </div>
        );
    }
}

export default SneakPeak;