import Layout from "../../components/Layout"
import GraphTableOld from "../../components/Tables/GraphTableOld";
import { GET_VARIANTS } from "../../graphql/queries";

export default function Variants() {
  
  return (
    <Layout title="Variants">
      <GraphTableOld cols={cols} title={"Variants"} query={GET_VARIANTS} searchParams={searchParams}/>
    </Layout>
  )
}

const cols = [
  { text: 'Project Name', value: 'projectName'},
  { text: 'Artist Name', value: 'artistNickname'},
  { text: 'Variant Name', value: 'name'},
  { text: 'Price', value: 'price'},
  { text: 'Utilites', value: (row) => JSON.stringify(row.utilities, null, "\t").slice(1, -1)},
  { text: 'Supply Total', value: 'supply'},
  { text: 'Supply Left', value: 'remaining'},
  { text: 'Creation Date', value: (row) => (new Date(row.createdAt)).toUTCString()},
]

const searchParams = [
  {
    text: 'Project Name',
    value: 'project_name'
  },
  {
    text: 'Variant Name',
    value: 'variant_name'
  },
]
