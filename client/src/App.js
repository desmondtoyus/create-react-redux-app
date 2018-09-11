import React, {Component} from 'react';
import Router from './components/router';
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
class App extends Component {
  
  render() {
    return (
        <div history ={history}>
          <Router/>
        </div>
    )
  }
}

export default App;