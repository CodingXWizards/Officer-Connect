import { Routes, Route, useNavigate } from 'react-router-dom';

import SignIn from "@/page/signin";
import Dashboard from "@/page/dashboard";
import { Navbar } from './components/navbar';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setIsAuthenticated, setUser } from './store/features/userSlice';
import { useFetch } from './hook/useFetch';
import { User } from './types/user';
import { Sidebar } from './components/sidebar';
import Leave from './page/leave';

const App = () => {

  const { isAuthenticated } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const { data, fetchData } = useFetch<User>('/api/user/', { method: 'GET' }, false);
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
      fetchData();
    }
  }, [isAuthenticated]);

  // Set user when user is fetched
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-grow'>
        <Navbar />
        <Routes>
          <Route path="/*" >
            <Route path='' element={<Dashboard />} />
            <Route path='leave' element={<Leave />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;