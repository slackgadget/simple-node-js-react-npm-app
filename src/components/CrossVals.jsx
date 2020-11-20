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
      } catch (e) {
        console.error(e.message);
      }
    }

    fetchCrossVals();
  }, []);

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
      <!--<ul>
        {crossValInfo((crossVal) => (
          <li key={crossVal.comboRuleset}>{crossVal.checkColumn}</li>
        ))}
      </ul> -->
      {crossValInfo((crossVal) => (
        <div>{JSON.stringify(crossVal)}</div>
      ))}
    </div>
  );
};

export default CrossVals;
