import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TvIcon from '@mui/icons-material/Tv';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const drawerWidth = 240;

const categories = [
  { name: 'Televizyon', icon: <TvIcon /> },
  { name: 'Led', icon: <FlashOnIcon /> },
  { name: 'Araç Şarj', icon: <DirectionsCarIcon /> },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  // Televizyon state
  const [tvList, setTvList] = useState([]);
  const [tvForm, setTvForm] = useState({ name: '', price: '', features: '', image: '' });
  const [tvError, setTvError] = useState('');
  const [tvSuccess, setTvSuccess] = useState('');
  const [tvLoading, setTvLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // Televizyonları getir
  useEffect(() => {
    if (selectedCategory === 'Televizyon') {
      fetchTelevisions();
    }
    // eslint-disable-next-line
  }, [selectedCategory]);

  const fetchTelevisions = async () => {
    try {
      const res = await axios.get('/api/television');
      setTvList(res.data);
    } catch (err) {
      setTvError('Televizyonlar yüklenemedi.');
    }
  };

  const handleTvFormChange = (e) => {
    setTvForm({ ...tvForm, [e.target.name]: e.target.value });
  };

  const handleTvSubmit = async (e) => {
    e.preventDefault();
    setTvError('');
    setTvSuccess('');
    setTvLoading(true);
    if (!tvForm.name || !tvForm.price) {
      setTvError('İsim ve fiyat zorunludur.');
      setTvLoading(false);
      return;
    }
    try {
      const res = await axios.post('/api/television', {
        name: tvForm.name,
        price: Number(tvForm.price),
        features: tvForm.features,
        image: tvForm.image
      });
      setTvSuccess('Televizyon başarıyla eklendi!');
      setTvForm({ name: '', price: '', features: '', image: '' });
      fetchTelevisions();
    } catch (err) {
      setTvError('Ekleme başarısız.');
    } finally {
      setTvLoading(false);
    }
  };

  // Fotoğraf seçilince backend'e yükle
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageUploading(true);
    setTvError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTvForm((prev) => ({ ...prev, image: res.data.url }));
    } catch (err) {
      setTvError('Fotoğraf yüklenemedi.');
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f6fa' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#fff' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => navigate('/') }>
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Anasayfa" />
            </ListItem>
          </List>
          <Divider />
          <List>
            {categories.map((cat, idx) => (
              <ListItem
                button
                key={cat.name}
                selected={selectedCategory === cat.name}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <ListItemIcon>{cat.icon}</ListItemIcon>
                <ListItemText primary={cat.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 5, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        {/* Televizyon Kategorisi */}
        {selectedCategory === 'Televizyon' && (
          <Box sx={{ width: '100%', maxWidth: 700 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Televizyon Ekle
            </Typography>
            <Paper sx={{ p: 3, mb: 3 }}>
              <form onSubmit={handleTvSubmit}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <TextField
                    label="İsim"
                    name="name"
                    value={tvForm.name}
                    onChange={handleTvFormChange}
                    required
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="Fiyat"
                    name="price"
                    type="number"
                    value={tvForm.price}
                    onChange={handleTvFormChange}
                    required
                    sx={{ flex: 1 }}
                  />
                </Box>
                <TextField
                  label="Özellikler"
                  name="features"
                  value={tvForm.features}
                  onChange={handleTvFormChange}
                  multiline
                  rows={2}
                  fullWidth
                  sx={{ mt: 2 }}
                />
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    disabled={imageUploading}
                  >
                    {imageUploading ? 'Yükleniyor...' : 'Fotoğraf Seç'}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>
                  {tvForm.image && (
                    <Box sx={{ mt: 1 }}>
                      <img src={tvForm.image} alt="Ürün" style={{ width: 80, borderRadius: 4 }} />
                    </Box>
                  )}
                </Box>
                {tvError && <Alert severity="error" sx={{ mt: 2 }}>{tvError}</Alert>}
                {tvSuccess && <Alert severity="success" sx={{ mt: 2 }}>{tvSuccess}</Alert>}
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={tvLoading}>
                  {tvLoading ? 'Ekleniyor...' : 'Ekle'}
                </Button>
              </form>
            </Paper>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Kayıtlı Televizyonlar
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>İsim</TableCell>
                    <TableCell>Fiyat</TableCell>
                    <TableCell>Özellikler</TableCell>
                    <TableCell>Resim</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tvList.map((tv) => (
                    <TableRow key={tv._id}>
                      <TableCell>{tv.name}</TableCell>
                      <TableCell>{tv.price} ₺</TableCell>
                      <TableCell>{tv.features}</TableCell>
                      <TableCell>
                        {tv.image && <img src={tv.image} alt={tv.name} style={{ width: 60, borderRadius: 4 }} />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        {/* Diğer kategoriler için placeholder */}
        {selectedCategory !== 'Televizyon' && (
          <Paper elevation={6} sx={{ p: 5, borderRadius: 3, minWidth: 320, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Bir kategori seçin
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Sol menüden bir kategori seçerek yönetebilirsiniz.
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard; 