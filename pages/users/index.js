import { useQuery } from "@apollo/client";
import { useState } from "react";
import Box from "../../components/Boxes/Box";
import Layout from "../../components/Layout"
import Popup from "../../components/Popups/Popup";
import GraphTable from "../../components/Tables/GraphTable";
import { GET_USERS, GET_USERS_KPI } from "../../graphql/queries";

export default function Users() {
  const { data } = useQuery(GET_USERS_KPI());
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
    <Layout title="Users">
      <div className='flex mb-[10px]'>
        <Box title='Total Users' value={data?.totalUserCount.value} />
        <Box title='New Users This Month' value={data?.newUserCount.value} className='ml-6' />
      </div>
      <GraphTable cols={cols} title={"Users"} query={GET_USERS} searchParams={searchParams} onRowClick={onRowClick} />
      <Popup hidden={isPopupHidden} onClose={onPopupClose} data={popupData} params={popupParams} />
    </Layout>
  )
}

const cols = [
  { text: 'Email', value: 'email'},
  { text: 'Nickname', value: 'nickname'},
  { text: 'First name', value: (row) => row.firstName},
  { text: 'Last name', value: (row) => row.lastName},
  { text: 'Genres', value: (row) => JSON.stringify(row.genres.map(e => e.name), null, "\t").slice(1, -1)},
  { text: 'NftBoughtCount', value: 'nftBougthCount'},
  { text: 'Creation Date', value: (row) => (new Date(row.createdAt)).toUTCString()},
  { text: 'Is Updated', value: (row) => (row.createdAt == row.updatedAt ? "No" : "Yes")},
  { text: ' ', value: () => (<button>Delete</button>)},
  { text: ' ', value: () => (<button>Edit</button>)},
]


const searchParams = [
  {
    text: 'Email',
    value: 'email'
  },  
  {
    text: 'First name',
    value: 'firstname'
  },
  {
    text: 'Last name',
    value: 'lastname'
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

const popupParams = [
  { text: 'Email', type: 'line', value: 'email'},
  { text: 'Nickname', type: 'line', value: 'nickname'},
  { text: 'First name', type: 'line', value: (row) => row.firstName},
  { text: 'Last name', type: 'line', value: (row) => row.lastName},
  { text: 'Genres', type: 'line', value: (row) => row.genres.map(e => e.name).join(", ")},
  { text: 'NftBoughtCount', type: 'line', value: 'nftBougthCount'},
  { text: 'Creation Date', type: 'line', value: (row) => (new Date(row.createdAt)).toUTCString()},
  { text: 'Is Updated', type: 'line', value: (row) => (row.createdAt == row.updatedAt ? "No" : "Yes")},
]