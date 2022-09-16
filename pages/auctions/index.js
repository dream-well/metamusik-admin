import { useState } from "react";
import { useQuery } from "@apollo/client";
import Box from "../../components/Boxes/Box";
import Layout from "../../components/Layout"
import DetailPage from "components/Pages/DetailPage";
import GraphTable from "../../components/Tables/GraphTable";
import { GET_AUCTIONS, GET_AUCTIONS_KPI } from "../../graphql/queries";

export default function Auctions() {
  
  const { data } = useQuery(GET_AUCTIONS_KPI());
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
    <Layout title=" ">
      { 
        isDetailHidden &&
          <GraphTable cols={cols} title={"Auctions"} query={GET_AUCTIONS} searchParams={searchParams} onRowClick={onRowClick}/>
      }
      {
        !isDetailHidden &&
        <DetailPage onBack={onBack} data={detailData} params={detailParams} />
      }
    </Layout>
  )
}

const cols = [
  { text: 'Auction Name', value: 'name'},
  { text: 'Artist Name', value:(row) => (row.artist.nickname)},
  { text: 'Min Price', value: 'startingPrice'},
  { text: 'Utilities', value: 'utilities'},
  { text: 'Start Date', value: 'startDate'},
  { text: 'End Date', value: 'endDate'},
  { text: 'Bidder Count', value: row => row.bids.length},
  { text: 'Current Price', value: row => row.highestBid ?? row.startingPrice },
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
  { text: 'Auction Name', type: 'line', value: 'name'},
  { text: 'Artist Name', type: 'line', value:(row) => (row.artist.nickname)},
  { text: 'Min Price', type: 'line', value: 'startingPrice'},
  { text: 'Utilities', type: 'line', value: 'utilities'},
  { text: 'Start Date', type: 'line', value: 'startDate'},
  { text: 'End Date', type: 'line', value: 'endDate'},
  { text: 'Bidder Count', type: 'line', value: row => row.bids.length},
  { text: 'Current Price', type: 'line', value: 'highestBid'},
  { text: 'Creation Date', type: 'line', value: (row) => (new Date(row.createdAt)).toUTCString()},
]