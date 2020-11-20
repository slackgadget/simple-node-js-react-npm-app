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
        <div>{JSON.stringify(crossValInfo)}</div>
    </div>
  );
};

export default CrossVals;
