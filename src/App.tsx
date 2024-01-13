// App.tsx
import React,{useState} from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './components/auth/Login';
import SignUp from './components/auth/Signup';
import Home from './components/Home'
import TripList from './components/trip/TripList'
import TripDetails from './components/trip/TripDetails'
import Payment from './components/Payment'

const App: React.FC = () => {
  return (
    <AuthProvider>
       <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/TripList" element={<TripList />}  />
          <Route path="/TripDetails" element={<TripDetails />}  />
          <Route path="/Payment" element={<Payment />}  />
		  <Route  path='/' element={<PrivateRoute/>}>
            <Route  path='/' element={<Home/>}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
