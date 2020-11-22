import React, { useState, useEffect } from 'react';
import { Header, Icon, Menu, Table} from 'semantic-ui-react';

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
        <Table celled>
          <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Combo Ruleset</Table.HeaderCell>
            <Table.HeaderCell>Account Label</Table.HeaderCell>
            <Table.HeaderCell>Check Column</Table.HeaderCell>
            <Table.HeaderCell>Match Criteria</Table.HeaderCell>
            <Table.HeaderCell>Check Value</Table.HeaderCell>
            <Table.HeaderCell>Match Value</Table.HeaderCell>
            <Table.HeaderCell>Account Range</Table.HeaderCell>
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
                <Table.Cell>{crossVal.accountRange}</Table.Cell>
              </Table.Row>
            ))
          }
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron left' />
                  </Menu.Item>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron right' />
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

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
