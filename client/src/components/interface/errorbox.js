import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

class ErrorBox extends Component {
    static propTypes = {
        match: PropTypes.object,
        params: PropTypes.object,
        error_message: PropTypes.string,
        show_redirect: PropTypes.bool
    };
    static defaultProps = {
        show_redirect: false
    };

    render() {
        return (
            <Alert color='primary'>
                <p>
                    An error has occurred: <span style={{color: 'lightsteelblue'}}>{this.props.error_message}</span>
                </p>
                {this.props.show_redirect &&
                    <a href={'/'}>Press here to return to the index</a>
                }
            </Alert>
        );
    }
}

export default ErrorBox;
