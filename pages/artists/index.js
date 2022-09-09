import Layout from "../../components/Layout"
import GraphTable from "../../components/Tables/GraphTable";
import { GET_ARTISTS } from "../../graphql/queries";

export default function Artists() {
  
  return (
    <Layout title="Artists">
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
