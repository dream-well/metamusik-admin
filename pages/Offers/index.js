import { useState } from "react";
import { useQuery } from "@apollo/client";
import Box from "../../components/Boxes/Box";
import Layout from "../../components/Layout"
import Popup from "../../components/Popups/Popup";
import GraphTable from "../../components/Tables/GraphTable";
import { GET_OFFERS, GET_OFFERS_KPI } from "../../graphql/queries";

export default function OFFERS() {
  
  const { data } = useQuery(GET_OFFERS_KPI());
  const [ isPopupHidden, setPopupHidden ] = useState(true);
  const [ popupData, setPopupData ] = useState();
  const onPopupClose = () => {
    setPopupHidden(true);
  }
  const onRowClick = (row) => {
    setPopupData(row);
    setPopupHidden(false);
  }

  let txNotCompleted;
  if(data) {
    txNotCompleted = data?.adminKpi.newOffers - data?.adminKpi.offersCompleted;
  }
  return (
    <Layout title="Offers">
      <div className='flex mb-[10px]'>
        <Box title='Total Offers' value={data?.offersMetadata.count} />
        <Box title='Sell' value={data?.adminKpi.offersCompleted} className='ml-6' />
      </div>
      <GraphTable cols={cols} title={"Offers"} query={GET_OFFERS} searchParams={searchParams} onRowClick={onRowClick}/>
      <Popup hidden={isPopupHidden} onClose={onPopupClose} data={popupData} params={popupParams} />
    </Layout>
  )
}

const cols = [
  { text: 'Collection Name', value: row => (row.nft.name)},
  { text: 'Seller Nickname', value:(row) => (row.seller_nickname)},
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

const popupParams = [
  { text: 'Collection Name', type: 'line', value: (row) => (row.nft.name)},
  { text: 'Seller Nickname', type: 'line', value: 'seller_nickname'},
  { text: 'Buyer Nickname', type: 'line', value: 'buyer_nickname'},
  { text: 'Variant Name', type: 'line', value: 'variant_name'},
  { text: 'Price', type: 'line', value: 'price'},
  { text: 'Status', type: 'line', value: 'status'},
  { text: 'Creation Date', type: 'line', value: (row) => (new Date(row.createdAt)).toUTCString()},
]