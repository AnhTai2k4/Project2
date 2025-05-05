import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Register = () => {
  const navigate = useNavigate();
  const [existingAccount, setExistingAccount] = useState({
    email: '',
    password: '',
  });
  const [newAccount, setNewAccount] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleExistingSubmit = (e) => {
    e.preventDefault();
    console.log('Existing account login:', existingAccount);
    navigate('/choose-device');
  };

  const handleNewSubmit = (e) => {
    e.preventDefault();
    console.log('New account registration:', newAccount);
    navigate('/choose-device');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom color="primary">
          Đăng ký thiết bị
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Chọn tài khoản bạn muốn sử dụng để theo dõi thiết bị này
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 4 }}>
          ... hoặc tạo tài khoản mới
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Form thêm thiết bị vào tài khoản có sẵn */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            border: '1px solid #4CAF50',
            borderRadius: '16px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EditNoteIcon sx={{ color: '#4CAF50', mr: 1 }} />
            <Typography variant="h6">
              Thêm thiết bị vào một tài khoản đã tồn tại
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleExistingSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              value={existingAccount.email}
              onChange={(e) => setExistingAccount({...existingAccount, email: e.target.value})}
              sx={{ 
                bgcolor: '#f0f9f0',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'transparent' },
                }
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Mật khẩu"
              type="password"
              variant="outlined"
              value={existingAccount.password}
              onChange={(e) => setExistingAccount({...existingAccount, password: e.target.value})}
              sx={{ 
                bgcolor: '#f0f9f0',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'transparent' },
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#4CAF50',
                  '&:hover': { bgcolor: '#45a049' },
                }}
              >
                Đăng ký
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Form tạo tài khoản mới */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            border: '1px solid #FF7B7B',
            borderRadius: '16px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PersonAddIcon sx={{ color: '#FF7B7B', mr: 1 }} />
            <Typography variant="h6">
              Tạo tài khoản mới
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleNewSubmit}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Tên"
                variant="outlined"
                value={newAccount.firstName}
                onChange={(e) => setNewAccount({...newAccount, firstName: e.target.value})}
                sx={{ 
                  bgcolor: '#fff5f5',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'transparent' },
                  }
                }}
              />
              <TextField
                fullWidth
                label="Họ"
                variant="outlined"
                value={newAccount.lastName}
                onChange={(e) => setNewAccount({...newAccount, lastName: e.target.value})}
                sx={{ 
                  bgcolor: '#fff5f5',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'transparent' },
                  }
                }}
              />
            </Box>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              value={newAccount.email}
              onChange={(e) => setNewAccount({...newAccount, email: e.target.value})}
              sx={{ 
                bgcolor: '#fff5f5',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'transparent' },
                }
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Mật khẩu"
              type="password"
              variant="outlined"
              value={newAccount.password}
              onChange={(e) => setNewAccount({...newAccount, password: e.target.value})}
              sx={{ 
                bgcolor: '#fff5f5',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'transparent' },
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#FF7B7B',
                  '&:hover': { bgcolor: '#ff6b6b' },
                }}
              >
                Đăng ký
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 