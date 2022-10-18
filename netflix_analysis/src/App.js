import React from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Dashboard from './Dashboard/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
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