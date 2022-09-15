import Card from "components/Cards/Card"

export default function DetailPage({onBack, params, data}) {
    return (
        <Card title=' '>
            <button className='pb-4' onClick={onBack}>
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
                                value={data ? (typeof value == 'function' ? value(data) : data[value]) : '...'}
                            />
                        }
                    </div>
                ))
            }
        </Card>
    )
}