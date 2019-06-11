// TODO
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Redirect extends Component {
    componentDidMount() {
        const { match: { params } } = this.props;
        const redirect_key = params.redirect_key;
        axios.get('/api/redirect/' + redirect_key)
            .then(response => {
                // URL = response.data.url
                // EXPIRATION = response.data.expiration_date
            })
            .catch(error => {
                // ERROR = error.response.data.error
            });
    }

    render() {
        return (
            <React.Fragment>
                <p>Redirect Component</p>
            </React.Fragment>
        );
    }
}

Redirect.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            redirect_key: PropTypes.string,
        }),
    }),
};


export default Redirect;
