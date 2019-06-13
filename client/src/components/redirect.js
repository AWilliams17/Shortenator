/* eslint-disable no-console */
// TODO: Styles
import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import {Alert, Button, Card, CardBody, Input} from 'reactstrap';

const countdownRenderer = ({ minutes, seconds, completed }) => {
    if (completed) {
        return (
            <span>It has expired.</span>
        );
    } else {
        return <span>{minutes}:{seconds}</span>;
    }
};

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
                <Card>
                    <CardBody style={{width: 'auto', minWidth: '600px'}}>
                        <p>
                            Target Link:
                            <Input disabled type='textarea' value={this.state.url}
                                style={{height: 'auto', minHeight: '100px'}}/>
                        </p>
                        <p>
                            Expires in: <Countdown date={moment() + this.state.expiration_time}
                                renderer={countdownRenderer}/>
                        </p>
                        <div className={'clearfix'}>
                            <a href={'/'}>
                                <Button type="button" className={'float-left'}>Submit New</Button>
                            </a>
                            <a href={this.state.url}>
                                <Button type="button" className={'float-right'}>Proceed to link</Button>
                            </a>
                        </div>
                    </CardBody>
                </Card>
            );
        }

        return (
            <Alert color='primary'>
                <p>No URL was found matching that ID/This ID has expired.</p>
                <a href={'/'}>Press here to return to the index</a>
            </Alert>
        );
    }
}

export default Redirect;
