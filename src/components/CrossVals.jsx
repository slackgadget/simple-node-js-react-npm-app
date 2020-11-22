import React, { useState, useEffect } from 'react';
import { Header, Icon } from 'semantic-ui-react';

const CrossVals = () => {
  const [crossValInfo, setCrossValInfo] = useState(null);

  useEffect(() => {
    async function fetchCrossVals() {
      try {
        let response = await fetch('http://localhost:8989/crossvals');
        response = await response.json();
        setCrossValInfo(response);
        // eslint-disable-next-line no-console
        console.log(response);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e.message);
      }
    }

    fetchCrossVals();
  }, [crossValInfo, setCrossValInfo]);

  if (!crossValInfo) {
    return (
      <div>
        <p>Fetching cross validation rule data....</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Header as="h1">
          <Icon name="drivers license outline" />
          {' '}
          Cross Validation Rules:&nbsp;
          {' '}
        </Header>
      </div>
      <div>
        <table>
          <tr>
            <th>Id</th>
            <th>Combo Ruleset</th>
            <th>Account Label</th>
            <th>Check Column</th>
            <th>Match Criteria</th>
            <th>Check Value</th>
            <th>Match Value</th>
            <th>Account Range</th>
          </tr>
          {
            /* eslint no-underscore-dangle: ["error", { "allow": ["_embedded"] }] */
            crossValInfo._embedded.crossvals.map((crossVal) => (
              <tr>
                <td>{crossVal.errDesc}</td>
                <td>{crossVal.comboRuleset}</td>
                <td>{crossVal.accountLabel}</td>
                <td>{crossVal.checkColumn}</td>
                <td>{crossVal.matchCriteria}</td>
                <td>{crossVal.checkValue}</td>
                <td>{crossVal.matchValue}</td>
                <td>{crossVal.accountRange}</td>
              </tr>
            ))
          }
        </table>
      </div>
    </div>
  );
};

export default CrossVals;
