import Layout from "../../components/Layout"
import GraphTable from "../../components/Tables/GraphTable";
import { GET_USERS } from "../../graphql/queries";

export default function Users() {
  
  return (
    <Layout title="Users">
      <GraphTable cols={cols} title={"Users"} query={GET_USERS} searchParams={searchParams}/>
    </Layout>
  )
}

const cols = [
  { text: 'Email', value: 'email'},
  { text: 'Nickname', value: 'nickname'},
  { text: 'Fullname', value: (row) => row.firstName ?? '' + ' ' + (row.lastName ?? '')},
  { text: 'Genres', value: (row) => JSON.stringify(row.genres.map(e => e.name), null, "\t").slice(1, -1)},
  { text: 'NftBoughtCount', value: 'nftBougthCount'},
  { text: 'Creation Date', value: (row) => (new Date(row.createdAt)).toUTCString()},
  { text: 'Is Updated', value: (row) => (row.createdAt == row.updatedAt ? "No" : "Yes")},
  { text: ' ', value: () => (<button>Delete</button>)},
  { text: ' ', value: () => (<button>Edit</button>)},
]


const searchParams = [
  {
    text: 'Email',
    value: 'email'
  },
  {
    text: 'Nickname',
    value: 'nickname'
  },
  {
    text: 'Genre',
    value: 'genre'
  },
]