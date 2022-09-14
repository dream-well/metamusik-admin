import cn from "classnames";

export default function Card({children, title, className}) {
    return (
        <div className={cn('bg-white rounded-[12px] shadow pb-[10px] px-6', className)}>
            <div className='flex'>
                <div className='font-medium text-[20px] py-[16px] flex-grow'>
                    { title }
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}