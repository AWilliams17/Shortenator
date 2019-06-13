import React, { Component } from 'react';
import ErrorBox from './interface/errorbox';

class NotFound extends Component {
    render() {
        return (
            <ErrorBox error_message={'Error: The page you are looking for was not found.'} show_redirect={true}/>
        );
    }
}

export default NotFound;
