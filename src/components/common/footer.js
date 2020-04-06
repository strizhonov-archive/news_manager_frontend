import React from 'react';

export default function Footer() {
    return (
        <footer className="container">
            <div className="row">
                <div className="col-md-12 text-center" style={copyright}>
                    <p>&copy;&nbsp;2020&nbsp;News Management</p>
                </div>
            </div>
        </footer>
    )
}

const copyright = {
    marginTop: "50px",
    marginBottom: "20px"
};