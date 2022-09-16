import { useState } from "react";
import { useQuery } from "@apollo/client";
import Box from "../../components/Boxes/Box";
import Layout from "../../components/Layout"
import DetailPage from "components/Pages/DetailPage";
import GraphTable from "../../components/Tables/GraphTable";
import { GET_OFFERS, GET_OFFERS_KPI } from "../../graphql/queries";

export default function Transactions() {
  
  const { data } = useQuery(GET_OFFERS_KPI());
  const [ isDetailHidden, setDetailHidden ] = useState(true);
  const [ detailData, setDetailData ] = useState();
  const onBack = () => {
    setDetailHidden(true);
  }
  const onRowClick = (row) => {
    setDetailData(row);
    setDetailHidden(false);
  }
 


  return (
    <Layout title="Offers">
      { 
        isDetailHidden &&
        <div>
          <div className='flex mb-[10px]'>
            <Box title='Open offers' value={data?.openOfferCount.value} />
            <Box title='Number of sell this month' value={data?.saleCount.value} className='ml-6' />
          </div>
          <GraphTable cols={cols} title={"Offers"} query={GET_OFFERS} searchParams={searchParams} onRowClick={onRowClick}/>
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
  { text: 'Collection Name', type: 'line', value: row => (row.nft.name)},
  { text: 'Seller Nickname', type: 'line', value:(row) => (row.seller.nickname)},
  { text: 'Variant Name', type: 'line', value: (row) => (row.nft.source.variant.name)},
  { text: 'Price', type: 'line', value: 'price'},
  { text: 'Status', type: 'line', value: 'status'},
  { text: 'Creation Date', type: 'line', value: (row) => (new Date(row.createdAt)).toUTCString()},
]