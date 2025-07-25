import React, { useState } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await axios.post('http://localhost:5050/api/admin/login', {
        email,
        password,
      });
      if (res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
        setSuccess(true);
        setTimeout(() => {
        if (onLogin) onLogin();
        }, 1000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f6fa' }}>
      <Paper elevation={6} sx={{ p: 4, maxWidth: 400, width: '100%', borderRadius: 3, boxShadow: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
            Admin Girişi
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 1 }}>{error}</Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2, mb: 1 }}>Giriş başarılı! Yönlendiriliyorsunuz...</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2, py: 1.2, fontWeight: 600, fontSize: '1rem' }}
            disabled={loading || success}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Giriş Yap'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminLogin; 