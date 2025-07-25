import React, { useState, useEffect } from 'react';
import Sidebar from '../components/DashboardComponents/Sidebar';
import TelevisionPanel from '../components/DashboardComponents/TelevisionPanel';
import LedPanel from '../components/DashboardComponents/LedPanel';
import ChargerPanel from '../components/DashboardComponents/ChargerPanel';
import TvIcon from '@mui/icons-material/Tv';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const categories = [
  { name: 'Televizyon', icon: <TvIcon /> },
  { name: 'LED', icon: <FlashOnIcon /> },
  { name: 'Araç Şarj', icon: <DirectionsCarIcon /> },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  // Televizyon state
  const [tvList, setTvList] = useState([]);
  const [tvForm, setTvForm] = useState({ name: '', brand: '', price: '', features: '', image: '' });
  const [tvError, setTvError] = useState('');
  const [tvSuccess, setTvSuccess] = useState('');
  const [tvLoading, setTvLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // Led state
  const [ledList, setLedList] = useState([]);
  const [ledForm, setLedForm] = useState({ name: '', brand: '', price: '', features: '', image: '' });
  const [ledError, setLedError] = useState('');
  const [ledSuccess, setLedSuccess] = useState('');
  const [ledLoading, setLedLoading] = useState(false);
  const [ledImageUploading, setLedImageUploading] = useState(false);

  // Charger state
  const [chargerList, setChargerList] = useState([]);
  const [chargerForm, setChargerForm] = useState({ name: '', brand: '', price: '', features: '', image: '' });
  const [chargerError, setChargerError] = useState('');
  const [chargerSuccess, setChargerSuccess] = useState('');
  const [chargerLoading, setChargerLoading] = useState(false);
  const [chargerImageUploading, setChargerImageUploading] = useState(false);

  // Televizyon için düzenleme state
  const [editingTvId, setEditingTvId] = useState(null);
  const [editTvForm, setEditTvForm] = useState({ name: '', brand: '', price: '', features: '', image: '' });
  const [editTvLoading, setEditTvLoading] = useState(false);

  // Led için düzenleme state
  const [editingLedId, setEditingLedId] = useState(null);
  const [editLedForm, setEditLedForm] = useState({ name: '', brand: '', price: '', features: '', image: '' });
  const [editLedLoading, setEditLedLoading] = useState(false);

  // Charger için düzenleme state
  const [editingChargerId, setEditingChargerId] = useState(null);
  const [editChargerForm, setEditChargerForm] = useState({ name: '', brand: '', price: '', features: '', image: '' });
  const [editChargerLoading, setEditChargerLoading] = useState(false);

  useEffect(() => {
    if (selectedCategory === 'Televizyon') {
      fetchTelevisions();
    } else if (selectedCategory === 'LED') {
      fetchLeds();
    } else if (selectedCategory === 'Araç Şarj') {
      fetchChargers();
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
    if (!tvForm.name || !tvForm.brand || !tvForm.price) {
      setTvError('İsim, marka ve fiyat zorunludur.');
      setTvLoading(false);
      return;
    }
    try {
      const res = await axios.post('/api/television', {
        name: tvForm.name,
        brand: tvForm.brand,
        price: Number(tvForm.price),
        features: tvForm.features,
        image: tvForm.image
      });
      setTvSuccess('Televizyon başarıyla eklendi!');
      setTvForm({ name: '', brand: '', price: '', features: '', image: '' });
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

  const fetchLeds = async () => {
    try {
      const res = await axios.get('/api/led');
      setLedList(res.data);
    } catch (err) {
      setLedError('Led ürünleri yüklenemedi.');
    }
  };

  const handleLedFormChange = (e) => {
    setLedForm({ ...ledForm, [e.target.name]: e.target.value });
  };

  const handleLedSubmit = async (e) => {
    e.preventDefault();
    setLedError('');
    setLedSuccess('');
    setLedLoading(true);
    if (!ledForm.name || !ledForm.brand || !ledForm.price) {
      setLedError('İsim, marka ve fiyat zorunludur.');
      setLedLoading(false);
      return;
    }
    try {
      const res = await axios.post('/api/led', {
        name: ledForm.name,
        brand: ledForm.brand,
        price: Number(ledForm.price),
        features: ledForm.features,
        image: ledForm.image
      });
      setLedSuccess('Led başarıyla eklendi!');
      setLedForm({ name: '', brand: '', price: '', features: '', image: '' });
      fetchLeds();
    } catch (err) {
      setLedError('Ekleme başarısız.');
    } finally {
      setLedLoading(false);
    }
  };

  // Led fotoğrafı seçilince backend'e yükle
  const handleLedImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLedImageUploading(true);
    setLedError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLedForm((prev) => ({ ...prev, image: res.data.url }));
    } catch (err) {
      setLedError('Fotoğraf yüklenemedi.');
    } finally {
      setLedImageUploading(false);
    }
  };

  const fetchChargers = async () => {
    try {
      const res = await axios.get('/api/charger');
      setChargerList(res.data);
    } catch (err) {
      setChargerError('Şarj cihazları yüklenemedi.');
    }
  };

  const handleChargerFormChange = (e) => {
    setChargerForm({ ...chargerForm, [e.target.name]: e.target.value });
  };

  const handleChargerSubmit = async (e) => {
    e.preventDefault();
    setChargerError('');
    setChargerSuccess('');
    setChargerLoading(true);
    if (!chargerForm.name || !chargerForm.brand || !chargerForm.price) {
      setChargerError('İsim, marka ve fiyat zorunludur.');
      setChargerLoading(false);
      return;
    }
    try {
      const res = await axios.post('/api/charger', {
        name: chargerForm.name,
        brand: chargerForm.brand,
        price: Number(chargerForm.price),
        features: chargerForm.features,
        image: chargerForm.image
      });
      setChargerSuccess('Şarj cihazı başarıyla eklendi!');
      setChargerForm({ name: '', brand: '', price: '', features: '', image: '' });
      fetchChargers();
    } catch (err) {
      setChargerError('Ekleme başarısız.');
    } finally {
      setChargerLoading(false);
    }
  };

  // Charger fotoğrafı seçilince backend'e yükle
  const handleChargerImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setChargerImageUploading(true);
    setChargerError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setChargerForm((prev) => ({ ...prev, image: res.data.url }));
    } catch (err) {
      setChargerError('Fotoğraf yüklenemedi.');
    } finally {
      setChargerImageUploading(false);
    }
  };

  // Televizyon Sil
  const handleDeleteTv = async (id) => {
    try {
      await axios.delete(`/api/television/${id}`);
      setTvList((prev) => prev.filter((tv) => tv._id !== id));
    } catch (err) {
      setTvError('Silme başarısız.');
    }
  };

  // Led Sil
  const handleDeleteLed = async (id) => {
    try {
      await axios.delete(`/api/led/${id}`);
      setLedList((prev) => prev.filter((led) => led._id !== id));
    } catch (err) {
      setLedError('Silme başarısız.');
    }
  };

  // Charger Sil
  const handleDeleteCharger = async (id) => {
    try {
      await axios.delete(`/api/charger/${id}`);
      setChargerList((prev) => prev.filter((charger) => charger._id !== id));
    } catch (err) {
      setChargerError('Silme başarısız.');
    }
  };

  // Televizyon Düzenle
  const handleEditTv = (tv) => {
    setEditingTvId(tv._id);
    setEditTvForm({ name: tv.name, brand: tv.brand, price: tv.price, features: tv.features, image: tv.image });
  };
  const handleEditTvFormChange = (e) => {
    setEditTvForm({ ...editTvForm, [e.target.name]: e.target.value });
  };
  const handleEditTvImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setEditTvLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setEditTvForm((prev) => ({ ...prev, image: res.data.url }));
    } finally {
      setEditTvLoading(false);
    }
  };
  const handleEditTvSave = async () => {
    setEditTvLoading(true);
    try {
      const res = await axios.put(`/api/television/${editingTvId}`, editTvForm);
      setTvList((prev) => prev.map((tv) => tv._id === editingTvId ? res.data : tv));
      setEditingTvId(null);
    } catch (err) {
      setTvError('Güncelleme başarısız.');
    } finally {
      setEditTvLoading(false);
    }
  };
  const handleEditTvCancel = () => {
    setEditingTvId(null);
  };

  // Led Düzenle
  const handleEditLed = (led) => {
    setEditingLedId(led._id);
    setEditLedForm({ name: led.name, brand: led.brand, price: led.price, features: led.features, image: led.image });
  };
  const handleEditLedFormChange = (e) => {
    setEditLedForm({ ...editLedForm, [e.target.name]: e.target.value });
  };
  const handleEditLedImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setEditLedLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setEditLedForm((prev) => ({ ...prev, image: res.data.url }));
    } finally {
      setEditLedLoading(false);
    }
  };
  const handleEditLedSave = async () => {
    setEditLedLoading(true);
    try {
      const res = await axios.put(`/api/led/${editingLedId}`, editLedForm);
      setLedList((prev) => prev.map((led) => led._id === editingLedId ? res.data : led));
      setEditingLedId(null);
    } catch (err) {
      setLedError('Güncelleme başarısız.');
    } finally {
      setEditLedLoading(false);
    }
  };
  const handleEditLedCancel = () => {
    setEditingLedId(null);
  };

  // Charger Düzenle
  const handleEditCharger = (charger) => {
    setEditingChargerId(charger._id);
    setEditChargerForm({ name: charger.name, brand: charger.brand, price: charger.price, features: charger.features, image: charger.image });
  };
  const handleEditChargerFormChange = (e) => {
    setEditChargerForm({ ...editChargerForm, [e.target.name]: e.target.value });
  };
  const handleEditChargerImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setEditChargerLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setEditChargerForm((prev) => ({ ...prev, image: res.data.url }));
    } finally {
      setEditChargerLoading(false);
    }
  };
  const handleEditChargerSave = async () => {
    setEditChargerLoading(true);
    try {
      const res = await axios.put(`/api/charger/${editingChargerId}`, editChargerForm);
      setChargerList((prev) => prev.map((charger) => charger._id === editingChargerId ? res.data : charger));
      setEditingChargerId(null);
    } catch (err) {
      setChargerError('Güncelleme başarısız.');
    } finally {
      setEditChargerLoading(false);
    }
  };
  const handleEditChargerCancel = () => {
    setEditingChargerId(null);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f6fa' }}>
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onNavigateHome={() => navigate('/')}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 5, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        {selectedCategory === 'Televizyon' && (
          <TelevisionPanel
            tvList={tvList}
            tvForm={tvForm}
            tvError={tvError}
            tvSuccess={tvSuccess}
            tvLoading={tvLoading}
            imageUploading={imageUploading}
            editingTvId={editingTvId}
            editTvForm={editTvForm}
            editTvLoading={editTvLoading}
            onTvFormChange={handleTvFormChange}
            onTvSubmit={handleTvSubmit}
            onImageChange={handleImageChange}
            onEditTv={handleEditTv}
            onEditTvFormChange={handleEditTvFormChange}
            onEditTvImageChange={handleEditTvImageChange}
            onEditTvSave={handleEditTvSave}
            onEditTvCancel={handleEditTvCancel}
            onDeleteTv={handleDeleteTv}
          />
        )}
        {selectedCategory === 'LED' && (
          <LedPanel
            ledList={ledList}
            ledForm={ledForm}
            ledError={ledError}
            ledSuccess={ledSuccess}
            ledLoading={ledLoading}
            ledImageUploading={ledImageUploading}
            editingLedId={editingLedId}
            editLedForm={editLedForm}
            editLedLoading={editLedLoading}
            onLedFormChange={handleLedFormChange}
            onLedSubmit={handleLedSubmit}
            onLedImageChange={handleLedImageChange}
            onEditLed={handleEditLed}
            onEditLedFormChange={handleEditLedFormChange}
            onEditLedImageChange={handleEditLedImageChange}
            onEditLedSave={handleEditLedSave}
            onEditLedCancel={handleEditLedCancel}
            onDeleteLed={handleDeleteLed}
          />
        )}
        {selectedCategory === 'Araç Şarj' && (
          <ChargerPanel
            chargerList={chargerList}
            chargerForm={chargerForm}
            chargerError={chargerError}
            chargerSuccess={chargerSuccess}
            chargerLoading={chargerLoading}
            chargerImageUploading={chargerImageUploading}
            editingChargerId={editingChargerId}
            editChargerForm={editChargerForm}
            editChargerLoading={editChargerLoading}
            onChargerFormChange={handleChargerFormChange}
            onChargerSubmit={handleChargerSubmit}
            onChargerImageChange={handleChargerImageChange}
            onEditCharger={handleEditCharger}
            onEditChargerFormChange={handleEditChargerFormChange}
            onEditChargerImageChange={handleEditChargerImageChange}
            onEditChargerSave={handleEditChargerSave}
            onEditChargerCancel={handleEditChargerCancel}
            onDeleteCharger={handleDeleteCharger}
          />
        )}
        {selectedCategory !== 'Televizyon' && selectedCategory !== 'LED' && selectedCategory !== 'Araç Şarj' && (
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