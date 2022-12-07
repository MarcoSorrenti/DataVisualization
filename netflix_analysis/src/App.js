import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Dashboard from './Dashboard/Dashboard';

const theme = createTheme({
  palette: {
      primary: {
          main: '#221f1f',
          contrastText: '#b20710'
      },
      secondary: {
          main: '#e50914',
          contrastText: '#f5f5f1'
      },
      background: {
          default: '#221f1f',
          main: '#221f1f',
          contrastText: '#f5f5f1'
      },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Header />
          <Dashboard />
          <Footer />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;