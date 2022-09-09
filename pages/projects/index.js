import Layout from "../../components/Layout"
import GraphTableOld from "../../components/Tables/GraphTableOld";
import { GET_PROJECTS } from "../../graphql/queries";

export default function Projects() {
  
  return (
    <Layout title="Projects">
      <GraphTableOld cols={cols} title={"Projects"} query={GET_PROJECTS} searchParams={searchParams}/>
    </Layout>
  )
}

const cols = [
  { text: 'Project Name', value: 'name'},
  { text: 'Artist Name', value: (row) => row.artist.nickname},
  { text: 'Variant Count', value: 'variantCount'},
  { text: 'Price Range', value: (row) => row.variants.map(e => e.price).join(" ,")},
  { text: 'Sales Count', value: 'saleCount'},
  { text: 'Visitor Count', value: 'visitorCount'},
  { text: 'Conversion Rate', value: 'conversionRate'},
  { text: 'Creation Date', value: (row) => (new Date(row.createdAt)).toUTCString()},
  { text: ' ', value: () => (<button>Delete</button>)},
  { text: ' ', value: () => (<button>Edit</button>)},
]

const searchParams = [
  {
    text: 'Artist Name',
    value: 'artist_name'
  },
  {
    text: 'Project Name',
    value: 'project_name'
  },
]
