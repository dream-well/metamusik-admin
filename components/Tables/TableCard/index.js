
import cn from 'classnames'
import Table from '../Table'
import Image from 'next/image';
import { BeatLoader } from 'react-spinners';
import { useState } from 'react';
import { getCellText } from 'utils';

function TableCard({className, total, perPage, title, rows=[], cols=[], isLoading=false, page=0, onPrev=()=>{}, onNext=()=>{}, onRowClick=()=>{} }) {
    const maxPage = Math.ceil(total / perPage);
    const [searchText, setSearchText] = useState('');
    const filteredRows = filterRows(cols, rows, searchText);
    return (
        <div className='bg-white rounded-[12px] shadow pb-[10px] px-6'>
            <div className='flex'>
                <div className='font-medium text-[20px] py-[16px] flex-grow'>
                    { title }
                </div>
                <div className='px-4 flex items-center'>
                    <div>Search:</div>
                    <input className='h-[30px] border mx-4 px-2 outline-none focus:border-[#76a] rounded-[4px]' 
                        value={searchText} 
                        onChange={e => setSearchText(e.target.value)} 
                        onKeyDown={e => {
                            if(e.key == "Enter")
                                onSearch({
                                    searchBy, searchText
                                });
                        }}
                    />
                </div>
            </div>
            <div className={cn('min-h-[523px] w-full relative', className)}>
                <Table cols={cols} rows={filteredRows} onRowClick={onRowClick} />
                {
                    isLoading && 
                        <div className='absolute w-full h-full'>
                            <div className='absolute flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                            Loading
                            <BeatLoader color='grey' />
                            </div>  
                        </div>
                    }
                    {
                    !isLoading && filteredRows.length == 0 &&
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
            {
                total > perPage && 
                    <div className='py-4 px-4 w-full flex justify-center'>
                        <button onClick={onPrev}>prev</button>
                        <div className='w-[60px] outline-none border text-center px-2 mx-2'>                
                            {page + 1}
                        </div>
                        { maxPage > 0 && '/' }
                        { maxPage > 0 && <span className='mx-4'>{maxPage}</span> }

                        <button onClick={onNext}>next</button>
                        <select className='ml-6 border h-[25px]' 
                            onChange={(e) => onChangePerPage(e.target.value)} 
                            value={perPage}
                        >
                            <option value='10'>10</option>
                            <option value='20'>20</option>
                            <option value='100'>100</option>
                        </select>
                        {total && <span className='mx-4'>total: {total}</span> }
                    </div>
            }
        </div>
    )   
}

function filterRows(cols, rows, searchText) {
    const filteredRows = [];
    for(let row of rows) {
        for(let col of cols) {
            const value = getCellText(row, col);
            if(typeof value == 'string' && value.indexOf(searchText) >= 0) {
                filteredRows.push(row);
                break;
            }
        }
    }
    return filteredRows;
}


export default TableCard