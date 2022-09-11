import cn from 'classnames'

export default function Popup({ className, hidden, onClose, params, data }) {

    return (
        <div className={cn("fixed top-0 left-0 z-20 w-screen h-screen backdrop-blur-sm bg-[#aaa]/30", hidden && "hidden")} onClick={onClose}>
            <div className={cn("absolute min-w-[600px] xl:min-w-[800px] min-h-[560px] bg-white px-[60px] pt-[70px] pb-[30px] rounded-[10px] shadow-lg top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col", className)}
                onClick={(e) => e.stopPropagation()}
            >
                <button className='absolute right-[25px] top-[25px] hover:text-[#f33] text-[20px]'
                    onClick={onClose}
                >
                    <i className='material-icons'>close</i>
                </button>

                {
                    data &&
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
                                    value={typeof value == 'function' ? value(data) : data[value]}
                                />
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}