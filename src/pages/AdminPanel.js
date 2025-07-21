import React, { useState } from 'react';
import AdminLogin from '../components/AdminPanel/AdminLogin';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <AdminLogin onLogin={() => setIsLoggedIn(true)} />
    </div>
  );
};

export default AdminPanel; 