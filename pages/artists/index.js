import { useQuery } from "@apollo/client";
import { useState } from "react";
import Box from "../../components/Boxes/Box";
import Layout from "../../components/Layout"
import GraphTable from "../../components/Tables/GraphTable";
import { GET_ARTISTS, GET_ARTISTS_KPI } from "../../graphql/queries";
import DetailPage from "components/Pages/DetailPage";

export default function Artists() {
  const { data } = useQuery(GET_ARTISTS_KPI());
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
    <Layout title="Artists">
      {
        isDetailHidden && 
        <div>
          <div className='flex mb-[10px]'>
            <Box title='Total Users' value={data?.artistsMetadata.count} />
            <Box title='New Users This Month' value={data?.adminKpi.newArtistCount} />
            <Box title='Revenue' value={data?.adminKpi.totalRevenue} />
            <Box title='Project Count' value={data?.artistsMetadata.projectCount} />
            <Box title='Total Visits' value={data?.visitorCount} />
            <Box title='Total Purchase' value={data?.saleCount} />
          </div>
          <GraphTable cols={cols} title={"artists"} query={GET_ARTISTS} searchParams={searchParams} onRowClick={onRowClick} />
        </div>
      }
      {
        !isDetailHidden &&
        <DetailPage onBack={onBack} data={detailData} params={detailParams} />
      }
    </Layout>
  )
}

const cols = [
  { text: 'Email', value: 'email'}, 
  { text: 'Nickname', value: 'nickname'},
  { text: 'Genres', value: (row) => JSON.stringify(row.genres.map(e => e.value), null, "\t").slice(1, -1)},
  { text: 'Project Count', value: 'projectCount'},
  { text: 'Total Visits', value: 'visitorCount'},
  { text: 'Total Purchase', value: 'saleCount'},
  { text: 'Revenue', value: 'revenue'},
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

const detailParams = [
  { text: 'Email', type: 'line', value: 'email'},
  { text: 'Nickname', type: 'line', value: 'nickname'},
  { text: 'Genres', type: 'line', value: (row) => JSON.stringify(row.genres.map(e => e.value), null, "\t").slice(1, -1)},
  { text: 'Project Count', type: 'line', value: 'projectCount'},
  { text: 'Total Visits', type: 'line', value: 'visitorCount'},
  { text: 'Total Purchase', type: 'line', value: 'saleCount'},
  { text: 'Video Url', type: 'line', value: 'videoURL'},
  { text: 'Video Title', type: 'line', value: 'videoTitle'},
  { text: 'Spotify', type: 'line', value: 'spotifyUrl'},
  { text: 'Banner', type: 'line', value: 'bannerUrl'},
  { text: 'Revenue', type: 'line', value: 'revenue'},
  { text: 'Creation Date', type: 'line', value: (row) => (new Date(row.createdAt)).toUTCString()},
]