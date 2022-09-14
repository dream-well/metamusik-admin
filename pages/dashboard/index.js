import Chart from 'chart.js/auto';

import { useQuery } from "@apollo/client";
import Image from "next/image";
import Box from "components/Boxes/Box";
import Layout from "components/Layout"
import TableCard from "components/Tables/TableCard";
import { GET_USERS_KPI } from "../../graphql/queries";
import Card from "components/Cards/Card";
import { Line } from 'react-chartjs-2';

export default function Dashboard(props) {
  const { data } = useQuery(GET_USERS_KPI());

  return (
    <Layout>
      <div className='relative px-[30px] py-[20px] rounded-[8px] bg-[#c7d2ff] mb-[30px] overflow-hidden'>
        <div className='absolute right-[100px] -translate-y-1/2 top-2/3'>
          <Image src="/images/plane.png" width='319' height='198' />
        </div>
        <h1 className='text-[30px] font-bold py-[8px]'>Good afternoon, Metamusik. 👋</h1>
        <p className='py-[4px] text-[16px]'>Here is what's happening with your projects today:</p>
      </div>
      <div className='flex mb-[10px]'>
        <Box title='Total sales' value={data?.totalUserCount.value} />
        <Box title='Marketplace made' value={data?.newUserCount.value} className='ml-6' />
        <Box title='Visitors in total' value={data?.newUserCount.value} className='ml-6' />
        <Box title='sales in total' value={data?.newUserCount.value} className='ml-6' />
        <Box title='collections created' value={data?.newUserCount.value} className='ml-6' />
      </div>
      <div className='pb-4'>
        <TableCard title="Top Channels" cols={cols} rows={rows} className='min-h-0'/>
      </div>
      <Card title='Sales Over Time (all stores)'>
        <CoinPriceChart {...props.marketData} />
      </Card>

      <div className='py-4'>
        <TableCard title="Customers" cols={cols} rows={rows} className='min-h-0'/>
      </div>

      <div className='py-4'>
        <TableCard title="Customers" cols={cols} rows={rows} className='min-h-0'/>
      </div>
      
      <div className='pb-4'>
        
      </div>
    </Layout>
  )
}

const cols = [
  { text: 'SOURCE', type: 'id', value: (row) => <div className='flex items-center'><img width='36' height='36' src={row.image} className='pr-2'/>{row.source}</div>},
  { text: 'VISITORS', value: 'visitors'},
  { text: 'REVENUES', value: (row) => <span className='text-[#2f2]'>{row.revenues}</span>},
  { text: 'SALES', value: 'sales'},
  { text: 'CONVERSION', value: (row) => <span className='text-[#22f]'>{row.conversion}</span>},
]

const rows = (new Array(10)).fill(
  {
    image: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
    source: 'Github.com',
    visitors: '2.4K',
    revenues: '$3,877',
    sales: 267,
    conversion: '4.7%'
  }
);

const CoinPriceChart = (props) => {
  //   this function will format our data to a much readable and
  //   useful form for chart.js
  const formatData = (data) => {
    // coingecko api provides the prices in an Array[Array[date, price]] format
    // so we will map throught each timestamp of the prices array
    return data.map((el) => {
      //   we will return the price & date values as an Array[Object{x: date, y: price}]
      //   which is in a datastructure that chart.js expects its input to be
      return {
        // lets convert our date to a localeString and use only the necessary
        // part like minutes and hours
        x: new Date(el[0]).toLocaleString().substr(11, 9),
        // also lets truncate our price to 2 decimal points for better redabililty
        y: el[1].toFixed(2)
      };
    });
  };

  //   we will provide some minor customizations for our chart
  //   and also its labels and inputs

  const data = {
    datasets: [
      {
        // label for our chart
        label: '$1,482',
        fill: true,
        data: formatData(props.prices),

        // color of the line chart
        borderColor: '#3B82F6',
        // partially transparent part below our line graph
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 3,
        pointRadius: props.pointRadius,
        pointHoverRadius: 5,
        borderCapStyle: 'butt',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
        pointHoverBorderWidth: 2
      }
    ]
  };

  //   and finally lets return a chart component with our api data and
  //   config
  return (
    <div className="chart-container w-full min-h-[300px] h-full p-2">
      <Line data={data} options={Config} />
    </div>
  );
};


const Config = {
  plugins: {

    // show legends for our graph
    legend: {
      display: true,
    },
  },
  lineHeightAnnotation: {
    always: true,
    lineWeight: 1.5,
  },

//   animate in
  animation: {
    duration: 1,
  },
  maintainAspectRatio: false,
  responsive: true,

//   show the x and y scales
  scales: {
    x: { display: true },
    y: { display: true },
  },
};

export const getServerSideProps = async () => {
  const _cg_api = 'https://api.coingecko.com/api/v3';

  const marketData = await fetch(
    `${_cg_api}/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly`
  ).then((res) => res.json());

  console.log(marketData);
  return {
    props: {
      marketData: marketData
    }
  };
};