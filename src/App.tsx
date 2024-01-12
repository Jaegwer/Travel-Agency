// App.tsx
import React,{useState} from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './components/auth/Login';
import SignUp from './components/auth/Signup';
import Home from './components/Home'
import TripList from './components/TripList'
import TripDetails from './components/TripDetails'

const App: React.FC = () => {
  return (
    <AuthProvider>
       <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/TripList" element={<TripList />}  />
          <Route path="/TripDetails" element={<TripDetails />}  />
		  <Route  path='/' element={<PrivateRoute/>}>
            <Route  path='/' element={<Home/>}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
