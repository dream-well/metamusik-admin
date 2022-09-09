import { useQuery } from "@apollo/client";
import Box from "../../components/Boxes/Box";
import Layout from "../../components/Layout"
import GraphTable from "../../components/Tables/GraphTable";
import { GET_USERS, GET_USERS_KPI } from "../../graphql/queries";

export default function Users() {
  const { data } = useQuery(GET_USERS_KPI());
  return (
    <Layout title="Users">
      <div className='flex mb-[10px]'>
        <Box title='Total Users' value={data?.totalUserCount.value} />
        <Box title='New Users This Month' value={data?.newUserCount.value} className='ml-6' />
      </div>
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