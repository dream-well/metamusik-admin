import { useQuery } from "@apollo/client";
import Box from "../../components/Boxes/Box";
import Layout from "../../components/Layout"
import GraphTable from "../../components/Tables/GraphTable";
import { GET_ARTISTS, GET_ARTISTS_KPI } from "../../graphql/queries";

export default function Artists() {

  const { data } = useQuery(GET_ARTISTS_KPI());
  return (
    <Layout title="Artists">
      <div className='flex mb-[10px]'>
        <Box title='Total Users' value={data?.artistsMetadata.count} />
        <Box title='New Users This Month' value={data?.adminKpi.newArtistCount} className='ml-6' />
        <Box title='Revenue' value={data?.adminKpi.totalRevenue} className='ml-6' />
      </div>
      <GraphTable cols={cols} title={"Artists"} query={GET_ARTISTS} searchParams={searchParams}/>
    </Layout>
  )
}

const cols = [
  { text: 'Email', value: 'email'},
  { text: 'Nickname', value: 'nickname'},
  { text: 'Genres', value: (row) => JSON.stringify(row.genres.map(e => e.value), null, "\t").slice(1, -1)},
  { text: 'Project Count', value: 'projectCount'},
  { text: 'Total Visits', value: 'visitorCount'},
  { text: 'Total Purchase', value: 'saleCount'},
  { text: 'Revenue', value: 'revenue'},
  { text: 'Creation Date', value: (row) => (new Date(row.createdAt)).toUTCString()},
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
