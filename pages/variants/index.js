import { useQuery } from "@apollo/client";
import { useState } from "react";
import Layout from "../../components/Layout"
import DetailPage from "components/Pages/DetailPage";
import GraphTableOld from "../../components/Tables/GraphTableOld";
import { GET_VARIANTS } from "../../graphql/queries";

export default function Variants() {
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
    <Layout title="Variants">
      {
        isDetailHidden &&
        <GraphTableOld cols={cols} title={"Variants"} query={GET_VARIANTS} searchParams={searchParams} onRowClick={onRowClick} />
        
      }
      {
        !isDetailHidden &&
        <DetailPage onBack={onBack} data={detailData} params={detailParams} />
      }
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

const detailParams = [
  { text: 'Project Name', type: 'line', value: 'projectName'},
  { text: 'Artist Name', type: 'line', value: 'artistNickname'},
  { text: 'Variant Name', type: 'line', value: 'name'},
  { text: 'Price', type: 'line', value: 'price'},
  { text: 'Utilites', type: 'line', value: (row) => JSON.stringify(row.utilities, null, "\t").slice(1, -1)},
  { text: 'Supply Total', type: 'line', value: 'supply'},
  { text: 'Supply Left', type: 'line', value: 'remaining'},
  { text: 'Creation Date', type: 'line', value: (row) => (new Date(row.createdAt)).toUTCString()},
]
