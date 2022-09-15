import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Header() {

    const [hover, setHover] = useState(false);

    const router = useRouter();

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        router.replace('/signin');
    }

    useEffect(() => {
        const onClick = () => { setHover(false) }
        window.addEventListener('click', onClick);
        return () => {
            window.removeEventListener('click', onClick);
        }
    }, [])

    return (
        <div className='relative w-full flex bg-white h-[60px] shadow-[0_2px_10px_0px_rgba(90,97,105,0.12)]'>
            <div className='absolute right-8 top-1/2 -translate-y-1/2 flex items-center cursor-pointer'
                onClick={(e) => {e.stopPropagation(), setHover(true)}}
            >
                <Image src='/images/user.png' width='32' height='32' className='rounded-full' />
                <span className='pl-2'>Metamusik.</span>
                <i className='material-icons mt-1'>expand_more</i>
                {
                    hover && 
                    <div className='absolute z-20 right-0 flex flex-col top-9 bg-white rounded-[4px] border p-4 w-[150px]'>
                        <div>
                            <p className='cursor-pointer'>Metamusik.</p>
                            <p className='text-[10px] pb-2 text-[#444] italic'>Administrator</p>
                        </div>
                        <ul className='border-t text-[#22f]'>
                            <li className='py-1 cursor-pointer'>Settings</li>
                            <li className='py-1 cursor-pointer' onClick={logout}>Sign Out</li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header;