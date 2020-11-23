import React, { useState, useEffect } from 'react';
import { Header, Icon, Menu, Table, Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

const CrossVals = () => {
  const [crossValInfo, setCrossValInfo] = useState(null);

  useEffect(() => {
    async function fetchCrossVals() {
      try {
        let response = await fetch('http://localhost:8989/crossvals?size=10');
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
      <Segment>
        <Dimmer active>
          <Loader />
        </Dimmer>
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
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
      <div style={{ width: '1000px', height: '500px', overflowX: 'scroll' }}>
        <Table compact striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
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
                  <Table.Cell>{crossVal.Id}</Table.Cell>
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
                <Menu floated="left" pagination>
                  <Menu.Item as="prev" icon>
                    /* eslint no-underscore-dangle: ["error", { "allow": ["_links"] }] */
                    <a href={crossValInfo._links.first} >
                      <Icon name="chevron left" />
                    </a>
                  </Menu.Item>
                  <Menu.Item as="next" icon>
                    /* eslint no-underscore-dangle: ["error", { "allow": ["_links"] }] */
                    <a href={ crossValInfo._links.next } >
                      <Icon name="chevron right" />
                    </a>
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
