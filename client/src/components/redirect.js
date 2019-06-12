/* eslint-disable no-console */
// TODO
import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';

class Redirect extends Component {
    static propTypes = {
        match: PropTypes.object,
        params: PropTypes.object,
        uuid: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state ={
            url: '',
            expiration_time: '',
            error: ''
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const uuid = params.uuid;
        axios.get('/api/redirect/' + uuid)
            .then(response => {
                const submissionDate = moment(response.data.submission_date);
                const timeElapsed = moment.duration(moment().diff(submissionDate));
                const timeRemaining = ((30 - timeElapsed.asMinutes()) * 60000); // react-countdown-now needs it in MS

                this.setState({
                    url: response.data.url,
                    expiration_time: timeRemaining
                });
            })
            .catch(error => {
                this.setState({error: error.response.data.error});
            });
    }

    render() {
        if (this.state.url !== '') {
            return (
                <React.Fragment>
                    <a href={this.state.url}>{this.state.url}</a>
                    <Countdown date={moment() + this.state.expiration_time}/>
                </React.Fragment>
            );
        }

        return <p>No URL was found matching that ID/This ID has expired.</p>;
    }
}

export default Redirect;
