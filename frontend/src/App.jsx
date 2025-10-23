import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/home/HomePage'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAuthUserStore } from './store/authUser'
import { useEffect } from 'react'
import { LoaderCircle } from 'lucide-react'
import WatchPage from './pages/WatchPage'

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthUserStore();
  // console.log("auth user is here", user);

  useEffect(() => {
    authCheck();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className='h-screen flex justify-center items-center bg-black'>
        <LoaderCircle className='animate-spin text-red-600 size-10 mx-auto mt-20' />
      </div>
    )
  }
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
      <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
      <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
    </Routes>
    <Footer />
    <Toaster />
    </>
  )
}

export default App
