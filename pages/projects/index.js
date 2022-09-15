import { useState } from "react";
import Layout from "../../components/Layout"
import Popup from "../../components/Popups/Popup";
import GraphTableOld from "../../components/Tables/GraphTableOld";
import { GET_PROJECTS } from "../../graphql/queries";

export default function Projects() {

  const [ isPopupHidden, setPopupHidden ] = useState(true);
  const [ popupData, setPopupData ] = useState();
  const onPopupClose = () => {
    setPopupHidden(true);
  }

  const onRowClick = (row) => {
    setPopupData(row);
    setPopupHidden(false);
  }

  

  return (
    <Layout title="Projects">
      <GraphTableOld cols={cols} title={"Projects"} query={GET_PROJECTS} searchParams={searchParams} onRowClick={onRowClick} />
      <Popup hidden={isPopupHidden} onClose={onPopupClose} data={popupData} params={popupParams} />
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

const popupParams = [
  { text: 'Project Name', type: 'line', value: 'name'},
  { text: 'Artist Name', type: 'line', value: (row) => row.artist.nickname},
  { text: 'Variant Count', type: 'line', value: 'variantCount'},
  { text: 'Price Rang', type: 'line', value: (row) => row.variants.map(e => e.price).join(" ,")},
  { text: 'Sales Count', type: 'line', value: 'saleCount'},
  { text: 'Visitor Count', type: 'line', value: 'visitorCount'},
  { text: 'Conversion Rate', type: 'line', value: row => Number(row.conversionRate ?? 0).toFixed(2)},
  { text: 'Creation Date', type: 'line', value: (row) => (new Date(row.createdAt)).toUTCString()},
]