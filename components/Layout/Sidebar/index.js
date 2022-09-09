import Link from "next/link";
import { useRouter } from "next/router";
import cn from 'classnames';

const menu = [
    {
        text: 'Dashboard',
        href: '/dashboard',
        icon: 'edit'
    },
    {
        text: 'Sales',
        href: '/sales',
        icon: 'vertical_split'
    },
    {
        text: 'Artists',
        href: '/artists',
        icon: 'brush'
    },
    {
        text: 'Users',
        href: '/users',
        icon: 'person'
    },
    {
        text: 'Genres',
        href: '/genres',
        icon: 'pets'
    },
    {
        text: 'Projects',
        href: '/projects',
        icon: 'view_module'
    },
    {
        text: 'Variants',
        href: '/variants',
        icon: 'emoji_objects'
    },
    {
        text: 'Auctions',
        href: '/auctions',
        icon: 'water_drop'
    },
    {
        text: 'Transactions',
        href: '/transactions',
        icon: 'table_chart'
    },
    {
        text: 'Offers',
        href: '/offers',
        icon: 'keyboard_command_key'
    },
    
]

function Sidebar() {

    const router = useRouter();

    return (
        <div className='flex flex-col w-[242px] shadow-[0_2px_150px_0px_rgba(90,97,105,0.1)] z-10'>
            <nav className='h-[60px] w-full text-center leading-[60px] border-b border-[#e1e5eb] text-[#222] font-medium mb-[2px]'>
                <div className='flex items-center    justify-center cursor-pointer'>
                    <i className='material-icons'>music_note</i>
                    <span className='ml-[4px]'>Metamusik Admin</span>
                </div>
            </nav>
            <ul>
            {
                menu.map(({text, href, icon}, key) => (
                    <li key={key} className={
                        cn('h-[50px] text-[#3d5170] hover:text-[#007bff] flex', 
                        // inset 0.1875rem 0 0 #007bff
                        href == router.pathname ? 'shadow-[inset_3px_0_0_0_#007bff] text-[#007bff]': '')}
                    >
                        <Link href={href}>
                            <div className='px-[25px] flex justify-center py-[15px] cursor-pointer'>
                                <i className='material-icons'>{icon}</i>
                                <span className='ml-[4px]'>{text}</span>
                            </div>
                        </Link>
                    </li>
                ))
            }
            </ul>
        </div>
    )
}

export default Sidebar;