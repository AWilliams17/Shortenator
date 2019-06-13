/* eslint-disable no-console*/
// TODO: Errors
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, Input, Button, Form } from 'reactstrap';

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
            <Card>
                <CardBody>
                    <CardTitle>Submit URL</CardTitle>
                    <Form inline>
                        <Input
                            type="text" name="url"
                            value={this.state.url}
                            onChange={this.handleURLChange}
                            style={{ width: '300px' }}/>
                        <Button type="button" onClick={this.submitURL}>Shorten URL</Button>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}

export default Index;
