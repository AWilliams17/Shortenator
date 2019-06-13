import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
                {this.props.error_message
                    ? <p>
                        An error has occurred: <span style={{color: 'lightsteelblue'}}>{this.props.error_message}</span>
                    </p>
                    :
                    <p>An unknown error has occurred.</p>
                }
                {this.props.show_redirect &&
                    <a href={'/'}>Press here to return to the index</a>
                }
            </Alert>
        );
    }
}

export default ErrorBox;
