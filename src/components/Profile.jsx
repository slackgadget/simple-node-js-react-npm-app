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

import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Header, Icon, Table } from 'semantic-ui-react';

const Profile = () => {
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

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile....</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Header as="h1">
          <Icon name="drivers license outline" />
          {' '}
          User Profile:&nbsp;
          {userInfo.name}
          {' '}
        </Header>
        <Table>
          <thead>
            <tr>
              <th>Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{userInfo.name}</td>
            </tr>
            <tr>
              <td>Given Name</td>
              <td>{userInfo.given_name}</td>
            </tr>
            <tr>
              <td>Family Name</td>
              <td>{userInfo.family_name}</td>
            </tr>
            <tr>
              <td>eMail</td>
              <td>{userInfo.email}</td>
            </tr>
            <tr>
              <td>User Name</td>
              <td>{userInfo.preferred_username}</td>
            </tr>
            <tr>
              <td>Locale</td>
              <td>{userInfo.locale}</td>
            </tr>
            <tr>
              <td>Zone Info</td>
              <td>{userInfo.zoneinfo}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Profile;
