import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DeviceCard = ({ title, color }) => (
  <Card
    sx={{
      height: '150px',
      bgcolor: color,
      borderRadius: '16px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    }}
  >
    <CardContent
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LocalFloristIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />
      <Typography variant="h6" align="center" sx={{ color: 'white' }}>
        {title}
      </Typography>
    </CardContent>
  </Card>
);

const ChooseDevice = () => {
  const devices = [
    { title: 'Ban công', color: '#FF7B7B' },
    { title: 'Vườn 1', color: '#FFB84D' },
    { title: 'Vườn 2', color: '#90EE90' },
    { title: 'Tầng thượng', color: '#A9A9A9' },
  ];

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          SmartSprout
        </Typography>
        <Box>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ mt: 4, mb: 3 }}>
        <Typography variant="h6">
          Xin chào, Thành!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Chọn một trong các thiết bị:
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {devices.map((device, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DeviceCard title={device.title} color={device.color} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ChooseDevice; 