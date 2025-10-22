import React from 'react'
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';
import { useAuthUserStore } from '../../store/authUser';

const HomePage = () => {
  const {user} = useAuthUserStore();;
  return (
    <div className=''>
      {user ? <HomeScreen /> : <AuthScreen />}
    </div>
  )
}

export default HomePage
