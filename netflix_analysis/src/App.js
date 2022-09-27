import React from 'react';
import ReactGA from 'react-ga';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Dashboard from './Dashboard/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackingID: 'UA-48149706-3',
    }
  }

  render() {
    ReactGA.initialize(this.state.trackingID);
    ReactGA.pageview(window.location.pathname + window.location.search);
    return (
      <div>
        <Header />
        <Dashboard />
        <Footer />
      </div>
    );
  }
}

export default App;