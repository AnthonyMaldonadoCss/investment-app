import { CSVLink } from 'react-csv';

interface Props {
  SendExport: Array<{
    currency: string,
    investment: number,
    calculateAmount: number,
    perYear: number
  }>
}

function ExportData ({SendExport}: Props) {

    const csvData = [
      ['currency', 'investment', 'calculateAmount', 'perYear'],
      ...SendExport.map(item => [
        item.currency,
        item.investment,
        item.calculateAmount,
        item.perYear,
      ]),
    ];
  
    const jsonData = JSON.stringify(SendExport);
  

  return ( 
    <div className='download--container'>
      <button>
      <CSVLink data={csvData} filename={'data.csv'}>
        Download CSV
      </CSVLink>
      </button>
      
      <button>
      <a
        href={`data:text/json;charset=utf-8,${encodeURIComponent(jsonData)}`}
        download="data.json"
      >
        Download JSON
      </a>
      </button>
      
    </div>
  )
}
export default ExportData