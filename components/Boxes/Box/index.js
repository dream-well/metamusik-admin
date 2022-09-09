import cn from 'classnames'
import { PuffLoader } from 'react-spinners';

function Box({title, value, className}) {
    return (
        <div className={cn('w-[194px] h-[139px] flex flex-col bg-white rounded-[10px] items-center justify-center', className)}>
            <div className='text-[12px] uppercase pt-[24px] text-center px-[16px]'>{title}</div>
            <div className='text-[33px] font-medium py-[16px]'>
                {value}
                {
                    !   value && 
                    <PuffLoader color='grey' size={50} />
                }
            </div>
        </div>
    )
}

export default Box;