import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

import { Home } from '@/src/screens/home-screen/home-screen';

import { RootState } from './store';

export default function HomeScreen() {
  const session = useSelector((state: RootState) => state.auth.isLoggedIn);

  const router = useRouter();

  useEffect(() => {
    if (session) router.navigate('/first.page');
  }, [session, router]);

  return <Home></Home>;
}
