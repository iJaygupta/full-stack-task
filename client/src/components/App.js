import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Location from '../containers/LocationContainer'
import DisplayMsg from './Location/DisplayMsg';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App" >
        <Switch>

          <Route exact path="/" component={Location} />
          <Route path="*" component={DisplayMsg} />
        </Switch>
      </div>
    );
  }

}

export default App;
