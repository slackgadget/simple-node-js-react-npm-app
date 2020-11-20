import React, { useState, useEffect } from 'react';
import { Header, Icon, Table } from 'semantic-ui-react';

const CrossVals = () => {
  const [crossValInfo, setCrossValInfo] = useState(null);

  useEffect(() => {
    async function fetchData(){
      const res = await fetch("http://localhost:8989/crossvals");

      const json = await res.json();
      setCrossValInfo(json.data.children.map(c => c.data));
    }

    fetchData();
  });

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
    </div>
  );
};

export default CrossVals;