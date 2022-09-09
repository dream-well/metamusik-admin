import { useEffect } from "react";
import { useRouter } from 'next/router'

const auth_pages = {
    "/users": true,
    "/admin": true,
    '/dashboard': true,
    '/sales': true,
    '/artists': true,
    '/users': true,
    '/genres': true,
    '/projects': true,
    '/variants': true,
    '/auctions': true,
    '/transactions': true,
    '/offers': true,
    '/': true,
}

function Auth({children}) {
    const router = useRouter();

    useEffect(() => {
        console.log(router.pathname);
        if(auth_pages[router.pathname]) {
            const token = localStorage.getItem('token');
            const expiresAt = localStorage.getItem('expiresAt');
            if(!token || !expiresAt || new Date(expiresAt) < new Date()) {
                router.replace('/signin');
            }
        }
    }, [])

    return (<div>{children}</div>)
}

export default Auth;