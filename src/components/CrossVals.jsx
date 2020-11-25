import React, { useState, useEffect } from 'react';
import { Header, Icon, Menu, Table, Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

const CrossVals = () => {
  const [crossValInfo, setCrossValInfo] = useState(null);
  const dataSet = 5;
  const currentPage = 0;
  const [crossValServiceURL, setCrossValServiceURL] = useState(`http://localhost:8989/crossvals?page=${currentPage}&size=${dataSet}`);

  const fetchCrossVals = async () => {
    try {
      let response = await fetch(crossValServiceURL);
      response = await response.json();
      setCrossValInfo(response);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  useEffect(() => {
    fetchCrossVals();
  }, [crossValServiceURL]);

  if (!crossValInfo) {
    return (
      <Segment>
        <Dimmer active>
          <Loader>Requested data .. Loading</Loader>
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
        <Table id="datatable" compact striped small>
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
              crossValInfo._embedded.crossvals.map((crossVal) => (
                <Table.Row>
                  <Table.Cell>{crossVal.crossval}</Table.Cell>
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
              <Table.HeaderCell colSpan="2">
                Page
                {' '}
                { crossValInfo.page.number + 1 }
                {' '}
                of
                {' '}
                { crossValInfo.page.totalPages }
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="5">
                <Menu floated="left" pagination>
                  <Menu.Item
                    as="a"
                    onClick={() => {
                      if (crossValInfo._links.first != null) {
                        setCrossValServiceURL(crossValInfo._links.first.href);
                      }
                    }}
                  >
                    First
                  </Menu.Item>
                  <Menu.Item
                    as="a"
                    onClick={() => {
                      if (crossValInfo._links.prev != null) {
                        setCrossValServiceURL(crossValInfo._links.prev.href);
                      }
                    }}
                    icon
                  >
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item
                    as="a"
                    onClick={() => {
                      if (crossValInfo._links.next != null) {
                        setCrossValServiceURL(crossValInfo._links.next.href);
                      }
                    }}
                    icon
                  >
                    <Icon name="chevron right" />
                  </Menu.Item>
                  <Menu.Item
                    as="a"
                    onClick={() => {
                      if (crossValInfo._links.last != null) {
                        setCrossValServiceURL(crossValInfo._links.last.href);
                      }
                    }}
                  >
                    Last
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
