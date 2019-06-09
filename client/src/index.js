import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';
import Root from './components/root';
import NotFound from './components/404';

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Root}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <Main/>,
    document.getElementById('root')
);
