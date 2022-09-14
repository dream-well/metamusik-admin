import { useQuery } from "@apollo/client";
import { useState } from "react";
import Box from "../../components/Boxes/Box";
import Layout from "../../components/Layout"
import Popup from "../../components/Popups/Popup";
import GraphTable from "../../components/Tables/GraphTable";
import { GET_SALES, GET_SALES_KPI } from "../../graphql/queries";

export default function Sales() {
  const { data } = useQuery(GET_SALES_KPI());
  const [ isPopupHidden, setPopupHidden ] = useState(true);
  const [ popupData, setPopupData ] = useState();
  const onPopupClose = () => {
    setPopupHidden(true);
  }
  const onRowClick = (row) => {
    setPopupData(row);
    setPopupHidden(false);
  }
 
  return (
    <Layout title="Sales">
      <div className='flex mb-[10px]'>
        <Box title='Total Sales' value={data?.all.saleCount} />
        <Box title='Total Sales This Month' value={data?.month.saleCount} className='ml-6' />
      </div>
      <GraphTable cols={cols} title={"Sales"} query={GET_SALES} searchParams={searchParams} onRowClick={onRowClick} />
      <Popup hidden={isPopupHidden} onClose={onPopupClose} data={popupData} params={popupParams} />
    </Layout>
  )
}

const cols = [
  { text: 'Collection Name', value: row => (row.nft.name)},
  { text: 'Artist Nickname', value: row => (row.nft.artistNickname)},
  { text: 'Seller', value: 'seller_nickname'},
  { text: 'Percent Marketplace', value: row => (row.metadata.percentMarketplace)},
  { text: 'Amount Marketplace', value: row => (row.metadata.amountMarketplace)},
  { text: 'Amount Artist', value: row => (row.metadata.amountArtist)},
  { text: 'Amount Seller', value: row => (row.metadata.totalPrice)},
  { text: 'Creation Date', value: (row) => (new Date(row.createdAt)).toUTCString()},
]

const searchParams = [
  {
    text: 'Collection Name',
    value: 'collection_name'
  },
  {
    text: 'Collection Id',
    value: 'collection_id'
  },
  {
    text: 'Nickname',
    value: 'nickname'
  },
]

const popupParams = [
  { text: 'Collection Name', type: 'line', value: (row) => (row.nft.name)},
  { text: 'Artist Nickname', type: 'line', value: (row) => (row.nft.artistNickname)},
  { text: 'Seller', type: 'line', value: (row) => (row.seller_nickname.value)},
  { text: 'Percent Marketplace', type: 'line', value: (row) => (row.metadata.percentMarketplace)},
  { text: 'Amount Marketplace', type: 'line', value: (row) => (row.metadata.amountMarketplace)},
  { text: 'Amount Artist', type: 'line', value: (row) => (row.metadata.amountArtist)},
  { text: 'Amount Seller', type: 'line', value: (row) => (row.metadata.totalPrice)},
  { text: 'Creation Date', type: 'line', value: (row) => (new Date(row.createdAt)).toUTCString()},
]