import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import { useNavigate } from 'react-router-dom';

const Config = () => {
  const navigate = useNavigate();
  const [wifiList] = useState(['WiFi 1', 'WiFi 2', 'WiFi 3']);
  const [selectedWifi, setSelectedWifi] = useState('');
  const [password, setPassword] = useState('');
  const [deviceName, setDeviceName] = useState('');

  const handleConnect = () => {
    if (!selectedWifi || !password || !deviceName) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    console.log('Connecting to:', { selectedWifi, password, deviceName });
    navigate('/register');
  };

  return (
    <Container maxWidth="xs"> {/* Gọn hơn maxWidth="sm" */}
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h5" align="center" color="primary" gutterBottom>
          Cấu hình WiFi
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          Kết nối thiết bị tưới nước đến mạng WiFi
        </Typography>
      </Box>

      <Paper
        elevation={2}
        sx={{
          p: 2,
          borderRadius: 2,
          border: '1px solid #4CAF50',
        }}
      >
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Mạng WiFi có sẵn</InputLabel>
            <Select
              value={selectedWifi}
              onChange={(e) => setSelectedWifi(e.target.value)}
              startAdornment={<WifiIcon sx={{ mr: 1, color: '#4CAF50' }} />}
            >
              {wifiList.map((wifi) => (
                <MenuItem key={wifi} value={wifi}>
                  {wifi}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            fullWidth
            label="Tên thiết bị"
            size="small"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleConnect}
            sx={{
              mt: 1,
              bgcolor: '#4CAF50',
              '&:hover': { bgcolor: '#45a049' },
              fontWeight: 'bold',
            }}
          >
            Kết nối →
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Config;
