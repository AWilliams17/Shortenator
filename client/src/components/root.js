import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Input, Button, Form } from 'reactstrap';
import ErrorBox from './interface/errorbox';

class Index extends Component {
    static propTypes = {
        history: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state ={
            url: '',
            error: ''
        };
    }

    submitURL = () => {
        const url = this.state.url;
        const payload = { 'URL': url };

        axios.post('/api/create_uuid', payload)
            .then(response => {
                this.props.history.push('/redirect/' + response.data.UUID);

            })
            .catch(error => {
                let errorMessage = error.response.data.Error;
                this.setState({error: errorMessage});
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
                            value={ this.state.url }
                            onChange={this.handleURLChange}
                            style={{ width: '300px' }}/>
                        <Button type="button" onClick={ this.submitURL }>Shorten URL</Button>
                    </Form>
                    {this.state.error !== '' &&
                        <ErrorBox error_message={this.state.error}/>
                    }
                </CardBody>
            </Card>
        );
    }
}

export default Index;
