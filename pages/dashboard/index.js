import { useQuery } from "@apollo/client";
import { useState } from "react";
import Box1 from "../../components/Boxes/Box";
import Box from "../../components/Boxes/Box";
import Layout from "../../components/Layout"
import GraphTable from "../../components/Tables/GraphTable";
import { GET_USERS, GET_USERS_KPI } from "../../graphql/queries";

export default function Users() {
  const { data } = useQuery(GET_USERS_KPI());

  return (
    <Layout>
      <div className='flex mb-[10px]'>
        <Box title='Total sales' value={data?.totalUserCount.value} />
        <Box title='Marketplace made' value={data?.newUserCount.value} className='ml-6' />
        <Box title='Visitors in total' value={data?.newUserCount.value} className='ml-6' />
        <Box title='sales in total' value={data?.newUserCount.value} className='ml-6' />
        <Box title='collections created' value={data?.newUserCount.value} className='ml-6' />
      </div>
    </Layout>
  )
}

const cols = [
  { text: 'Email', value: 'email'},
  { text: 'Nickname', value: 'nickname'},
  { text: 'Fullname', value: (row) => row.firstName ?? '' + ' ' + (row.lastName ?? '')},
  { text: 'Genres', value: (row) => JSON.stringify(row.genres.map(e => e.name), null, "\t").slice(1, -1)},
  { text: 'NftBoughtCount', value: 'nftBougthCount'},
  { text: 'Creation Date', value: (row) => (new Date(row.createdAt)).toUTCString()},
  { text: 'Is Updated', value: (row) => (row.createdAt == row.updatedAt ? "No" : "Yes")},
  { text: ' ', value: () => (<button>Delete</button>)},
  { text: ' ', value: () => (<button>Edit</button>)},
]

