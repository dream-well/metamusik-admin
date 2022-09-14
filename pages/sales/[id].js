import { useQuery } from "@apollo/client";
import Card from "components/Cards/Card";
import { useRouter } from "next/router";
import Layout from "../../components/Layout"
import { GET_SALES } from "../../graphql/queries";

export default function Sale() {

  const router = useRouter();

  const { id } = router.query;

  const { data } = useQuery( GET_SALES({id}));

  const goBack = () => {
      const path = router.pathname.split('/');
      path.pop();
      router.replace(path.join('/'));
  }

  return (
    <Layout title="">
        <Card title=' '>
            <button className='pb-4' onClick={goBack}>
                <i className='material-icons'>keyboard_return</i>
            </button>
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
    { text: 'Collection Name', type: 'line', value: (row) => (row.nft.name)},
    { text: 'Artist Nickname', type: 'line', value: (row) => (row.nft.artistNickname)},
    { text: 'Seller', type: 'line', value: (row) => (row.seller_nickname.value)},
    { text: 'Percent Marketplace', type: 'line', value: (row) => (row.metadata.percentMarketplace)},
    { text: 'Amount Marketplace', type: 'line', value: (row) => (row.metadata.amountMarketplace)},
    { text: 'Amount Artist', type: 'line', value: (row) => (row.metadata.amountArtist)},
    { text: 'Amount Seller', type: 'line', value: (row) => (row.metadata.totalPrice)},
    { text: 'Creation Date', type: 'line', value: (row) => (new Date(row.createdAt)).toUTCString()},
  ]