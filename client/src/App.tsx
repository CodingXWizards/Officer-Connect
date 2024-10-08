import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { User } from '@/types/user';
import { useFetch } from '@/hook/useFetch';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsAuthenticated, setUser } from '@/store/features/userSlice';

import SignIn from "@/page/signin";
import MainLayout from '@/layouts/main-layout';
import Dashboard from "@/page/dashboard";
import Leave from '@/page/leave';
import LeaveApplication from '@/page/leave/application';
import Performance from '@/page/performance';

const App = () => {

  const { isAuthenticated } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const { data, start, error } = useFetch<User>('/api/user/', { method: 'GET' }, false);
  const navigate = useNavigate();

  // Check authentication status on page load
  useEffect(() => {
    const authenticated = localStorage.getItem('isAuthenticated');
    if (authenticated === 'true') {
      dispatch(setIsAuthenticated(true));
    } else {
      navigate('/signin');
    }
  }, []);

  // Fetch user data if authenticated
  useEffect(() => {
    if (isAuthenticated && !data) {
      start();
    }
  }, [isAuthenticated]);

  // Set user when user is fetched
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  useEffect(()=>{
    if(error){
      navigate('/signin');
    }
  }, [error]);

  return (
    <Routes>
      <Route path="/*" element={<MainLayout />}>
        <Route path='' element={<Dashboard />} />
        <Route path='leave' >
          <Route path='' element={<Leave />} />
          <Route path='application' element={<LeaveApplication />} />
        </Route>
        <Route path='performance' element={<Performance />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

export default App;