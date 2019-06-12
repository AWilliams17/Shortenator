/* eslint-disable no-console*/
// TODO
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Index extends Component {
    static propTypes = {
        history: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state ={
            url: ''
        };
    }

    submitURL = () => {
        const url = this.state.url;
        const payload = { 'url': url };

        axios.post('/api/create_uuid', payload)
            .then(response => {
                console.log(response);
                this.props.history.push('/redirect/' + response.data.uuid);

            })
            .catch(error => {
                console.log(error.response.data);
            });
    };

    handleURLChange = (e) => {
        this.setState({url: e.target.value});
    };

    render() {
        return (
            <React.Fragment>
                <input type="text" name="url" value={this.state.url} onChange={this.handleURLChange} />
                <button type="button" onClick={this.submitURL}>Shorten URL</button>
            </React.Fragment>
        );
    }
}

export default Index;
