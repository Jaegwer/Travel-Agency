// App.tsx
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './components/auth/Login';
import SignUp from './components/auth/Signup';
import Home from './components/Home'

const App: React.FC = () => {
  return (
    <AuthProvider>
       <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
		  <Route  path='/home' element={<PrivateRoute/>}>
            <Route  path='/home' element={<Home/>}/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
