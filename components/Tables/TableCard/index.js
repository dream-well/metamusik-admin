
import cn from 'classnames'
import Table from '../Table'
import Image from 'next/image';
import { BeatLoader } from 'react-spinners';
import { useState } from 'react';

function TableCard( props ) {
    const maxPage = Math.ceil(props.total / props.perPage);
    const [searchBy, setSearchBy] = useState('');
    const [searchText, setSearchText] = useState('');
    return (
        <div className='bg-white rounded-[12px] shadow pb-[10px]'>
            <div className='flex'>
                <div className='font-medium text-[20px] p-[16px] flex-grow'>
                    { props.title }
                </div>
                <div className='px-4 flex items-center'>
                    <div>Search By:</div>
                    <select className='h-[30px] border ml-4 px-2' value={searchBy} onChange={(e) => {
                        setSearchBy(e.target.value);
                        setSearchText('');
                    }}>
                        {
                            props.searchParams.map((param, key) => (
                                <option key={key} value={param.value}>{param.text}</option>
                            ))
                        }
                    </select>
                    <input className='h-[30px] border mx-4 px-2' 
                        value={searchText} 
                        onChange={e => setSearchText(e.target.value)} 
                        onKeyDown={e => {
                            if(e.key == "Enter")
                                props.onSearch({
                                    searchBy, searchText
                                });
                        }}
                    />
                </div>
            </div>
            <div className='min-h-[523px] w-full relative'>
                <Table {...props} />
                {
                    props.isLoading && 
                        <div className='absolute w-full h-full'>
                            <div className='absolute flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                            Loading
                            <BeatLoader color='grey' />
                            </div>  
                        </div>
                    }
                    {
                    !props.isLoading && props.rows.length == 0 &&
                    <div className='absolute w-full h-full'>
                        <div className='absolute flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                            <Image src='/images/no-content.svg' width='144' height='135' />
                            <div className='pt-[26px]'>
                                Sorry, No record found.
                            </div>
                        </div>  
                    </div>
                }
            </div>
            <div className='py-4 px-4 w-full flex justify-center'>
                <button onClick={props.onPrev}>prev</button>
                <div className='w-[60px] outline-none border text-center px-2 mx-2'>                
                    {props.page + 1}
                </div>
                { maxPage > 0 && '/' }
                { maxPage > 0 && <span className='mx-4'>{maxPage}</span> }

                <button onClick={props.onNext}>next</button>
                <select className='ml-6 border h-[25px]' 
                    onChange={(e) => props.onChangePerPage(e.target.value)} 
                    value={props.perPage}
                >
                    <option value='10'>10</option>
                    <option value='20'>20</option>
                    <option value='100'>100</option>
                </select>
                {props.total && <span className='mx-4'>total: {props.total}</span> }
            </div>
        </div>
    )   
}

export default TableCard