import React from 'react';

class Today extends React.Component {
    render() {
        return (
            <div className="ui segment" style={{textAlign: "center"}}>
                <i class="calendar alternate outline icon big" /> <b>{new Date().toLocaleDateString()}</b> 
            </div>
        )
    }
}

export default Today;