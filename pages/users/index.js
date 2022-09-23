import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Box from "../../components/Boxes/Box";
import Layout from "../../components/Layout"
import GraphTable from "../../components/Tables/GraphTable";
import { GET_USERS, GET_USERS_KPI } from "../../graphql/queries";

export default function Users() {
  const router = useRouter();
  const { data } = useQuery(GET_USERS_KPI());
  const onRowClick = (row) => {
    router.push(router.pathname + '/' + row._id);
  }
  return (
    <Layout title="Users">
      <div className='flex mb-[10px]'>
        <Box title='Total Users' value={data?.totalUserCount.value} />
        <Box title='New Users This Month' value={data?.newUserCount.value} className='ml-6' />
        <Box title='Nft Count' value={data?.newUserCount.topUsersByNftCount.nftCount} className='ml-6' />
      </div>
      <GraphTable orderBy={{field: 'createdAt', direction: "DESC"}} cols={cols} title={"Users"} query={GET_USERS} searchParams={searchParams} onRowClick={onRowClick} />
    </Layout>
  )
}

const cols = [
  { text: 'Email', value: 'email'},
  { text: 'Nickname', value: 'nickname'},
  { text: 'Genres', value: (row) => JSON.stringify(row.genres.map(e => e.name), null, "\t").slice(1, -1)},
  { text: 'Creation Date', value: (row) => (new Date(row.createdAt)).toUTCString()},
]


const searchParams = [
  {
    text: 'Email',
    value: 'email'
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
