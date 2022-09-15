import { useState } from "react";
import Layout from "../../components/Layout"
import DetailPage from "components/Pages/DetailPage";
import GraphTableOld from "../../components/Tables/GraphTableOld";
import { GET_PROJECTS } from "../../graphql/queries";

export default function Projects() {

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
    <Layout title="Projects">
      {
        isDetailHidden &&
          <GraphTableOld cols={cols} title={"Projects"} query={GET_PROJECTS} searchParams={searchParams} onRowClick={onRowClick} />
      }
      {
        !isDetailHidden &&
        <DetailPage onBack={onBack} data={detailData} params={detailParams} />
      }
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
  { text: 'Conversion Rate', value: row => Number(row.conversionRate ?? 0).toFixed(2)},
  { text: 'Creation Date', value: (row) => (new Date(row.createdAt)).toUTCString()}
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

const detailParams = [
  { text: 'Project Name', type: 'line', value: 'name'},
  { text: 'Artist Name', type: 'line', value: (row) => row.artist.nickname},
  { text: 'Variant Count', type: 'line', value: 'variantCount'},
  { text: 'Price Rang', type: 'line', value: (row) => row.variants.map(e => e.price).join(" ,")},
  { text: 'Sales Count', type: 'line', value: 'saleCount'},
  { text: 'Visitor Count', type: 'line', value: 'visitorCount'},
  { text: 'Conversion Rate', type: 'line', value: row => Number(row.conversionRate ?? 0).toFixed(2)},
  { text: 'Creation Date', type: 'line', value: (row) => (new Date(row.createdAt)).toUTCString()},
]