import { useQuery } from "@apollo/client";
import { useState } from "react";
import Layout from "../../components/Layout"
import Popup from "../../components/Popups/Popup";
import GraphTable from "../../components/Tables/GraphTable";
import TableCard from "../../components/Tables/TableCard";
import { GET_GENRES} from "../../graphql/queries";



export default function Genres() {
  const {data, loading} = useQuery(GET_GENRES);
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
    <Layout title="Genres">
      <TableCard 
        rows={data?.data ?? []} 
        cols={cols} 
        className="w-full" 
        title={"Genres"}
        page={0}
        perPage={100}
        total={data?.data.length ?? 0}
        isLoading={loading}
        onSearch={({searchBy, searchText}) => {
          
        }}
        searchParams={searchParams}
        onRowClick={onRowClick}
      />
      <Popup hidden={isPopupHidden} onClose={onPopupClose} data={popupData} params={popupParams} />
    </Layout>
  )
}

const cols = [
  { text: 'Label', value: 'label'},
  { text: 'Creation Date', value: (row) => (new Date(row.createdAt)).toUTCString()},
  { text: ' ', value: () => (<button>Delete</button>)},
  { text: ' ', value: () => (<button>Edit</button>)},
]

const searchParams = [
  {
    text: 'Label',
    value: 'label'
  },
]

const popupParams = [
  { text: 'Label', type: 'line', value: 'label'},
  { text: 'Creation Date', type: 'line', value: (row) => (new Date(row.createdAt)).toUTCString()},
]