/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Button, Header } from 'semantic-ui-react';

const Home = () => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, authService]); // Update if authState changes

  const login = async () => {
    authService.login('/');
  };

  if (authState.isPending) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <div>
        <Header as="h1">Accounting Hub Manager</Header>

        {authState.isAuthenticated && !userInfo
        && <div>Loading user information...</div>}

        {authState.isAuthenticated && userInfo
        && (
          <div>
            <p>
              Welcome back,&nbsp;
              {userInfo.name}
              !
            </p>
            <p>
              This project demonstrates the use of consuming java Spring Boot REST Web Services through a React Driven UI.
              Additionally the project is configured to contain it&lsquo;s own versioned build instructions through Jenkins
              Pipelined Builds.
            </p>
            <p>
              The UI showcases the use of React Menus, Tables, Paging, Loading Dialogue, UI Styling and Icon graphics from semantic-UI
              As well as MySQL Database Integration, Consumption of REST Web Services,  User Profiles
            </p>
            <p>
              For the purposes of this demo you can see implemented service (Cross Validation Rules Lookup) and
              unimplemented services (Messaging Service) cohabiting within the UI. The UI is fault tolerant as a result of the
              Micro-Service architecture.
            </p>
            <p>
              Additionally this Demo displays the use a federated Authentication platform, Okta, which handles the Authentication
              and Role Security of the Web Application through configuration.
            </p>
          </div>
        )}

        {!authState.isAuthenticated
        && (
          <div>
            <p>
              If you&lsquo;re viewing this page then you have successfully found the management console.
            </p>
            <p>
              Click the login button below to continue. If you don&lsquo;t have a login then you can request access by clicking here: &nbsp;
              <a href="http://www.infermata.com/access">Admin </a>
            </p>
            <Button id="login-button" primary onClick={login}>Login</Button>
          </div>
        )}

      </div>
    </div>
  );
};
export default Home;
