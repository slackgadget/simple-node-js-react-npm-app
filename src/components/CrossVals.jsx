import React, { useState, useEffect } from 'react';
import { Header, Icon, Menu, Table } from 'semantic-ui-react';

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
      <div class="ui segment">
        <div class="ui active dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Header as="h1">
          <Icon name="tasks" />
          {' '}
          Cross Validation Rules
          {' '}
        </Header>
        <p>&nbsp;</p>
      </div>
      <div>
        <Table fixed compact striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>Id</Table.HeaderCell>
              <Table.HeaderCell>Combo Ruleset</Table.HeaderCell>
              <Table.HeaderCell>Account Label</Table.HeaderCell>
              <Table.HeaderCell>Check Column</Table.HeaderCell>
              <Table.HeaderCell>Match Criteria</Table.HeaderCell>
              <Table.HeaderCell>Check Value</Table.HeaderCell>
              <Table.HeaderCell>Match Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              /* eslint no-underscore-dangle: ["error", { "allow": ["_embedded"] }] */
              crossValInfo._embedded.crossvals.map((crossVal) => (
                <Table.Row>
                  <Table.Cell>{crossVal.errDesc}</Table.Cell>
                  <Table.Cell>{crossVal.comboRuleset}</Table.Cell>
                  <Table.Cell>{crossVal.accountLabel}</Table.Cell>
                  <Table.Cell>{crossVal.checkColumn}</Table.Cell>
                  <Table.Cell>{crossVal.matchCriteria}</Table.Cell>
                  <Table.Cell>{crossVal.checkValue}</Table.Cell>
                  <Table.Cell>{crossVal.matchValue}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
};

export default CrossVals;

