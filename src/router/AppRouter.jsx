import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { CheckingAuth } from '../ui/components/CheckingAuth'
import { onAuthStateChanged } from 'firebase/auth'
import { FirebaseAuth } from '../firebase/config'
import { login, logout } from '../store/auth'

export const AppRouter = () => {

  const {status} = useSelector(state => state.auth);  
  const dispatch = useDispatch();

  useEffect(() => {
    
    onAuthStateChanged( FirebaseAuth, async(user) => {

      if (!user) return dispatch(logout());

      dispatch( login(user))

    })

  }, [])

  if(status === 'checking') {
    return <CheckingAuth/>
  }

  return (
    <Routes>

      {
        (status === 'authenticated')
        ? <Route path='/*' element={<JournalRoutes />}/>
        : <Route path='/auth/*' element={<AuthRoutes />}/>
      }

      <Route path='/*' element={<Navigate to='/auth/login' />}/>

      {/* Login y Registro */}
      {/* <Route path='/auth/*' element={<AuthRoutes />}/> */} {/* Cualquier path que comience con auth va a ser redirigido hacia aqui */}

      {/*JournalApp */}
      {/* <Route path='/*' element={<JournalRoutes />}/> */}
      
    </Routes>
  )
}
