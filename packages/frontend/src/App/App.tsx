import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {ListView} from '../ListView/ListView';
import {BlockView} from '../BlockView/BlockView';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ListView}>
                    </Route>

                    <Route path="/:blockId" component={BlockView}>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
