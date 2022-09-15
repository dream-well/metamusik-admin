import { useQuery } from "@apollo/client";
import { useState } from "react";
import Layout from "../../components/Layout"
import DetailPage from "components/Pages/DetailPage";
import GraphTable from "../../components/Tables/GraphTable";
import TableCard from "../../components/Tables/TableCard";
import { GET_GENRES} from "../../graphql/queries";



export default function Genres() {
  const {data, loading} = useQuery(GET_GENRES);

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
    <Layout title="Genres">
      {
        isDetailHidden &&
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
      }
      {
        !isDetailHidden &&
        <DetailPage onBack={onBack} data={detailData} params={detailParams} />
      }
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

const detailParams = [
  { text: 'Label', type: 'line', value: 'label'},
  { text: 'Creation Date', type: 'line', value: (row) => (new Date(row.createdAt)).toUTCString()},
]