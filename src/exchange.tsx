import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import ExportData from './components/Export';
import btc from './assets/bitcoin.png'
import ada from './assets/cardano.png'
import ether from './assets/ether.png'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Props {
  body: {
    currency: string,
    amount: number
  },
}
interface Typos {
  currency: string,
  investment: number,
  calculateAmount: number,
  perYear: number
  i: number
}
const Exchange = ({body}: Props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const shouldFetchDataRef = useRef(true);
  const url = 'http://localhost:3005/exchange/get_rates/';

  useEffect(() => {
    if (shouldFetchDataRef.current) {
      const fetchData = async () => {
        try {
          const response = await axios({
            method: 'POST',
            url: url,
            headers: { 'content-type': 'application/json' },
            data: body
          });
          setData(response.data);
        }
        catch (error: any) {
          setError(error.message);
        }
      };

      fetchData();
      shouldFetchDataRef.current = false
    }
  }, [body]);


  useEffect(() => {
    shouldFetchDataRef.current = true;
  }, [data]);

  return (
    <>
      <TableContainer className='table--container' component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Currency</TableCell>
              <TableCell align="center">Inversión</TableCell>
              <TableCell align="center">Monto en Cripto</TableCell>
              <TableCell align="right">Monto en $ al año</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: Typos ,i) => (
              <TableRow key={i+1}>
                <TableCell component="th" scope="row">
                  {i+1}
                </TableCell>
                <TableCell align="center">{row.currency}</TableCell>
                <TableCell align="center">{row.investment}</TableCell>
                <TableCell align="center" className='table--body-row'>
                {row.currency === 'btc' && (
                  <img 
                  src={btc} alt="Bitcoin"
                  className='table--body-icons'
                  />
                )}
                {row.currency === 'eth' && (
                  <img 
                  src={ether} alt="Ethereum"
                  className='table--body-icons'
                  />
                )}
                {row.currency === 'ada' && (
                  <img 
                  src={ada} alt="Cardano"
                  className='table--body-icons'
                  />
                )}
                  {row.calculateAmount}
                </TableCell>
                <TableCell align="right">{row.perYear}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      { data.length > 0 ? <ExportData SendExport={data} /> : null }
    </>
  );
};

export default Exchange;