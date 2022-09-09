import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('expiresAt');
    if(!token || !expiresAt || new Date(expiresAt) < new Date()) {
        router.replace('/signin');
    } 
    else
    router.replace('/sales');
  }, [])
  return (
    <div>
      
    </div>
  )
}
