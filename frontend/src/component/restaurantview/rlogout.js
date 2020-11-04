import React, { Component } from 'react';
import cookie from "react-cookies";
import { Redirect } from "react-router";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restLogout } from '../../redux/action/loginaction';
import axios from "axios";


class rlogout extends React.Component {

    componentDidMount() {
        this.restLogout();

        // this.props.restLogout();
        // console.log(this.props);
        
    }

    restLogout = async() => {
       await axios
            .get("/logout")
            .then(function (response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                }).catch(err => {
                    console.log('caught it!', err);
                })
     };


    render() {
        localStorage.removeItem('search1');
        localStorage.removeItem('search2');
        var redirectVar = <Redirect to="/" />
        return (
            <div>
                {redirectVar}
                <div>
                    <br />

                    <div>

                        <h1>Logout Successful</h1>
                    </div>
                </div>
            </div>

        )

    }
}
rlogout.propTypes = {
    restLogout: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return ({
        user: state.login.user
    })
};

// export default connect(mapStateToProps, { restLogout })(rlogout);
// //export default rlogout

const mapDispatchToProps = (dispatch) => {
    localStorage.clear();
    return { restLogout: (user) => dispatch(restLogout(user)) };
};
export default connect(mapStateToProps, mapDispatchToProps)(rlogout)