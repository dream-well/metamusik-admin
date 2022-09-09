import { useQuery } from "@apollo/client";
import Layout from "../../components/Layout"
import GraphTable from "../../components/Tables/GraphTable";
import TableCard from "../../components/Tables/TableCard";
import { GET_GENRES } from "../../graphql/queries";



export default function Genres() {
  const { error, data, loading } = useQuery(GET_GENRES);

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
      />
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
