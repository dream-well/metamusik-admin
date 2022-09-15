import { useState } from "react";
import { useQuery } from "@apollo/client";
import Box from "../../components/Boxes/Box";
import Layout from "../../components/Layout"
import DetailPage from "components/Pages/DetailPage";
import GraphTable from "../../components/Tables/GraphTable";
import { GET_TRANSACTIONS, GET_TRANSACTIONS_KPI } from "../../graphql/queries";

export default function Transactions() {
  
  const { data } = useQuery(GET_TRANSACTIONS_KPI());
  const [ isDetailHidden, setDetailHidden ] = useState(true);
  const [ detailData, setDetailData ] = useState();
  const onBack = () => {
    setDetailHidden(true);
  }
  const onRowClick = (row) => {
    setDetailData(row);
    setDetailHidden(false);
  }
 

  let txNotCompleted;
  if(data) {
    txNotCompleted = data?.adminKpi.newTransactions - data?.adminKpi.transactionsCompleted;
  }
  return (
    <Layout title="Transactions">
      { 
        isDetailHidden &&
        <div>
          <div className='flex mb-[10px]'>
            <Box title='Total Transactions' value={data?.transactionsMetadata.count} />
            <Box title='Completed Txs This Month' value={data?.adminKpi.transactionsCompleted} className='ml-6' />
            <Box title='Not Completed Txs This Month' className='ml-6'
              value={txNotCompleted}  />
          </div>
          <GraphTable cols={cols} title={"Transactions"} query={GET_TRANSACTIONS} searchParams={searchParams} onRowClick={onRowClick}/>
        </div>
      }
      {
        !isDetailHidden &&
        <DetailPage onBack={onBack} data={detailData} params={detailParams} />
      }
    </Layout>
  )
}

const cols = [
  { text: 'Collection Name', value: row => (row.nft.name)},
  { text: 'Seller Nickname', value:(row) => (row.seller.nickname)},
  { text: 'Buyer Nickname', value:(row) => (row.buyer.nickname)},
  { text: 'Variant Name', value: (row) => (row.nft.source.variant.name)},
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

const detailParams = [
  { text: 'Collection Name', type: 'line', value: (row) => (row.nft.name)},
  { text: 'Seller Nickname', type: 'line', value: 'seller_nickname'},
  { text: 'Buyer Nickname', type: 'line', value: 'buyer_nickname'},
  { text: 'Variant Name', type: 'line', value: 'variant_name'},
  { text: 'Price', type: 'line', value: 'price'},
  { text: 'Status', type: 'line', value: 'status'},
  { text: 'Creation Date', type: 'line', value: (row) => (new Date(row.createdAt)).toUTCString()},
]