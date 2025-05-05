import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add validation and API call here
    console.log('Login submitted:', formData);
    // Chuyển hướng đến trang cấu hình WiFi sau khi đăng nhập thành công
    navigate('/config');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          SmartSprout
        </Typography>
        <Typography variant="h5" gutterBottom>
          Đăng nhập
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            mt: 2,
            borderRadius: '16px',
            border: '1px solid #4CAF50',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: '#4CAF50',
                '&:hover': { bgcolor: '#45a049' },
              }}
            >
              Đăng nhập
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link
                href="/register"
                variant="body2"
                sx={{ color: '#4CAF50', textDecoration: 'none' }}
              >
                {"Chưa có tài khoản? Đăng ký ngay"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 