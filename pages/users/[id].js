import { useQuery } from "@apollo/client";
import Card from "components/Cards/Card";
import LazyImage from "components/Images/LazyImage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout"
import { GET_USERS } from "../../graphql/queries";

export default function User() {

  const router = useRouter();

  const { id } = router.query;

  const { data } = useQuery( GET_USERS({id}));

  const goBack = () => {
      router.back();
  }
  const src = data?.data[0].avatarUrl;

  return (
    <Layout title="">
        <Card title=' '>
            <button className='pb-4' onClick={goBack}>
                <i className='material-icons'>keyboard_return</i>
            </button>
            <div>
            <LazyImage src={src} width='50' height='50' className='rounded-full mb-4' 
                placeholder='https://cdn-icons-png.flaticon.com/512/149/149071.png'
            />
            </div>
            {
                params.map(({text, type, value}, key) => (
                    <div className='flex flex-col mb-[24px]' key={key}>
                        <div className='text-[10px] mb-[4px] px-[2px]'>
                            {text}
                        </div>
                        {   
                            type == 'line' && 
                            <input 
                                readOnly={true} 
                                className='w-full border-b px-[2px] outline-none' 
                                value={data ? (typeof value == 'function' ? value(data.data[0]) : data.data[0][value]) : '...'}
                            />
                        }
                    </div>
                ))
            }
        </Card>
    </Layout>
  )
}

const params = [
  { text: 'Email', type: 'line', value: 'email'},
  { text: 'Nickname', type: 'line', value: 'nickname'},
  { text: 'Genres', type: 'line', value: (row) => row.genres.map(e => e.name).join(", ")},
  { text: 'NftBoughtCount', type: 'line', value: 'nftBougthCount'},
  { text: 'Creation Date', type: 'line', value: (row) => (new Date(row.createdAt)).toUTCString()},
  { text: 'Is Updated', type: 'line', value: (row) => (row.createdAt == row.updatedAt ? "No" : "Yes")},
]