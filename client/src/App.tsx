import { Routes, Route } from 'react-router-dom';

import SignIn from "@/page/signin";
import Home from "@/page/home";
import { Navbar } from './components/navbar';

const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default App;