import { useQuery } from "@apollo/client";
import Box from "../../components/Boxes/Box";
import Layout from "../../components/Layout"
import GraphTable from "../../components/Tables/GraphTable";
import { GET_SALES, GET_SALES_KPI } from "../../graphql/queries";

export default function Sales() {
  
  const { data } = useQuery(GET_SALES_KPI());
  return (
    <Layout title="Sales">
      <div className='flex mb-[10px]'>
        <Box title='Total Sales' value={data?.all.saleCount} />
        <Box title='Total Sales This Month' value={data?.month.saleCount} className='ml-6' />
      </div>
      <GraphTable cols={cols} title={"Sales"} query={GET_SALES} searchParams={searchParams}/>
    </Layout>
  )
}

const cols = [
  { text: 'Collection Name', value: 'collection_name'},
  { text: 'Artist Nickname', value: row => (row.project.artist.nickname)},
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
