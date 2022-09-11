import { useQuery } from "@apollo/client";
import Box from "../../components/Boxes/Box";
import Layout from "../../components/Layout"
import GraphTable from "../../components/Tables/GraphTable";
import { GET_TRANSACTIONS, GET_TRANSACTIONS_KPI } from "../../graphql/queries";

export default function Transactions() {
  
  const { data } = useQuery(GET_TRANSACTIONS_KPI());
  let txNotCompleted;
  if(data) {
    txNotCompleted = data?.adminKpi.newTransactions - data?.adminKpi.transactionsCompleted;
  }
  return (
    <Layout title="Transactions">
      <div className='flex mb-[10px]'>
        <Box title='Total Transactions' value={data?.transactionsMetadata.count} />
        <Box title='Completed Txs This Month' value={data?.adminKpi.transactionsCompleted} className='ml-6' />
        <Box title='Not Completed Txs This Month' className='ml-6'
          value={txNotCompleted}  />
      </div>
      <GraphTable cols={cols} title={"Transactions"} query={GET_TRANSACTIONS} searchParams={searchParams}/>
    </Layout>
  )
}

const cols = [
  { text: 'Collection Name', value: 'collection_name'},
  { text: 'Seller Nickname', value: 'seller_nickname'},
  { text: 'Buyer Nickname', value: 'buyer_nickname'},
  { text: 'Variant Name', value: 'variant_name'},
  { text: 'Price', value: 'price'},
  { text: 'Status', value: 'status'},
  { text: 'Creation Date', value: (row) => (new Date(row.createdAt)).toUTCString()},
]

const searchParams = [
  {
    text: 'Collection Name',
    value: 'collection_name'
  },
  {
    text: 'Email',
    value: 'email'
  },
  {
    text: 'UserId',
    value: 'userid'
  },
  {
    text: 'Status',
    value: 'status'
  },
]
