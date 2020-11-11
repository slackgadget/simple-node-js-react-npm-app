import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
import config from './components/config';
import Home from './Home';
import Messages from './components/Messages';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

const App = () => (
  <Router>
    <Security {...config.oidc}>
      <Navbar />
      <Container text style={{ marginTop: '7em' }}>
        <Route path="/" exact component={Home} />
        <Route path="/login/callback" component={LoginCallback} />
        <SecureRoute path="/messages" component={Messages} />
        <SecureRoute path="/profile" component={Profile} />
      </Container>
    </Security>
  </Router>
);
export default App;
