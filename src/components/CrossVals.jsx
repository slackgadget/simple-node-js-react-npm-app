import React, { useState, useEffect } from 'react';
import { Header, Icon } from 'semantic-ui-react';

const CrossVals = () => {
  const [crossValInfo, setCrossValInfo] = useState(null);

  useEffect(() => {
    async function fetchCrossVals() {
      let response = await fetch('http://localhost:8989/crossvals');
      response = await response.json()
      setCrossValInfo(response)
    }

    fetchCrossVals()
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
      <ul>
        {crossValInfo.map((crossVal) => (
          <li key={crossVal.comboRuleset}>{crossVal.checkColumn}</li>
        ))}
      </ul>
      <div>{JSON.stringify(crossVal)}</div>
    </div>
  );
};

export default CrossVals;
