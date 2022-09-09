import Layout from "../../components/Layout"
import GraphTable from "../../components/Tables/GraphTable";
import { GET_TRANSACTIONS } from "../../graphql/queries";

export default function Transactions() {
  
  return (
    <Layout title="Transactions">
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
