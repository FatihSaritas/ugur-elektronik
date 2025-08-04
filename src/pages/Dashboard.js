import React, { useState, useEffect } from 'react';
import Sidebar from '../components/DashboardComponents/Sidebar';
import TelevisionPanel from '../components/DashboardComponents/TelevisionPanel';
import LedPanel from '../components/DashboardComponents/LedPanel';
import ChargerPanel from '../components/DashboardComponents/ChargerPanel';
import BrandPanel from '../components/DashboardComponents/BrandPanel';
import TvIcon from '@mui/icons-material/Tv';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Box, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const categories = [
  { name: 'Televizyon', icon: <TvIcon /> },
  { name: 'LED', icon: <FlashOnIcon /> },
  { name: 'Araç Şarj', icon: <DirectionsCarIcon /> },
  { name: 'Markalar', icon: <StorefrontIcon /> },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  // Televizyon state
  const [tvList, setTvList] = useState([]);
  const [tvForm, setTvForm] = useState({ name: '', brand: '', price: '', features: '', images: [] });
  const [tvError, setTvError] = useState('');
  const [tvSuccess, setTvSuccess] = useState('');
  const [tvLoading, setTvLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // Led state
  const [ledList, setLedList] = useState([]);
  const [ledForm, setLedForm] = useState({ name: '', brand: '', price: '', features: '', images: [] });
  const [ledError, setLedError] = useState('');
  const [ledSuccess, setLedSuccess] = useState('');
  const [ledLoading, setLedLoading] = useState(false);
  const [ledImageUploading, setLedImageUploading] = useState(false);

  // Charger state
  const [chargerList, setChargerList] = useState([]);
  const [chargerForm, setChargerForm] = useState({ name: '', brand: '', price: '', features: '', images: [] });
  const [chargerError, setChargerError] = useState('');
  const [chargerSuccess, setChargerSuccess] = useState('');
  const [chargerLoading, setChargerLoading] = useState(false);
  const [chargerImageUploading, setChargerImageUploading] = useState(false);

  // Televizyon için düzenleme state
  const [editingTvId, setEditingTvId] = useState(null);
  const [editTvForm, setEditTvForm] = useState({ name: '', brand: '', price: '', features: '', images: [] });
  const [editTvLoading, setEditTvLoading] = useState(false);

  // Led için düzenleme state
  const [editingLedId, setEditingLedId] = useState(null);
  const [editLedForm, setEditLedForm] = useState({ name: '', brand: '', price: '', features: '', images: [] });
  const [editLedLoading, setEditLedLoading] = useState(false);

  // Charger için düzenleme state
  const [editingChargerId, setEditingChargerId] = useState(null);
  const [editChargerForm, setEditChargerForm] = useState({ name: '', brand: '', price: '', features: '', images: [] });
  const [editChargerLoading, setEditChargerLoading] = useState(false);

  // Brand state
  const [brandList, setBrandList] = useState([]);
  const [brandForm, setBrandForm] = useState({ name: '', image: '' });
  const [brandError, setBrandError] = useState('');
  const [brandSuccess, setBrandSuccess] = useState('');
  const [brandLoading, setBrandLoading] = useState(false);
  const [brandImageUploading, setBrandImageUploading] = useState(false);

  // Brand için düzenleme state
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [editBrandForm, setEditBrandForm] = useState({ name: '', image: '', isActive: true });
  const [editBrandLoading, setEditBrandLoading] = useState(false);

  useEffect(() => {
    if (selectedCategory === 'Televizyon') {
      fetchTelevisions();
    } else if (selectedCategory === 'LED') {
      fetchLeds();
    } else if (selectedCategory === 'Araç Şarj') {
      fetchChargers();
    } else if (selectedCategory === 'Markalar') {
      fetchBrands();
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
      await axios.post('/api/television', {
        name: tvForm.name,
        brand: tvForm.brand,
        price: Number(tvForm.price),
        features: tvForm.features,
        images: tvForm.images
      });
      setTvSuccess('Televizyon başarıyla eklendi!');
      setTvForm({ name: '', brand: '', price: '', features: '', images: [] });
      fetchTelevisions();
    } catch (err) {
      setTvError('Ekleme başarısız.');
    } finally {
      setTvLoading(false);
    }
  };

  // Çoklu fotoğraf seçilince backend'e yükle
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setImageUploading(true);
    setTvError('');
    try {
      const uploadedImages = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploadedImages.push(res.data.url);
      }
      setTvForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedImages] }));
    } catch (err) {
      setTvError('Fotoğraflar yüklenemedi.');
    } finally {
      setImageUploading(false);
    }
  };

  // Fotoğraf silme fonksiyonu
  const handleRemoveImage = (index) => {
    setTvForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
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
      await axios.post('/api/led', {
        name: ledForm.name,
        brand: ledForm.brand,
        price: Number(ledForm.price),
        features: ledForm.features,
        images: ledForm.images
      });
      setLedSuccess('Led başarıyla eklendi!');
      setLedForm({ name: '', brand: '', price: '', features: '', images: [] });
      fetchLeds();
    } catch (err) {
      setLedError('Ekleme başarısız.');
    } finally {
      setLedLoading(false);
    }
  };

  // Led çoklu fotoğrafı seçilince backend'e yükle
  const handleLedImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setLedImageUploading(true);
    setLedError('');
    try {
      const uploadedImages = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploadedImages.push(res.data.url);
      }
      setLedForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedImages] }));
    } catch (err) {
      setLedError('Fotoğraflar yüklenemedi.');
    } finally {
      setLedImageUploading(false);
    }
  };

  // Led fotoğraf silme fonksiyonu
  const handleLedRemoveImage = (index) => {
    setLedForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
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
      await axios.post('/api/charger', {
        name: chargerForm.name,
        brand: chargerForm.brand,
        price: Number(chargerForm.price),
        features: chargerForm.features,
        images: chargerForm.images
      });
      setChargerSuccess('Şarj cihazı başarıyla eklendi!');
      setChargerForm({ name: '', brand: '', price: '', features: '', images: [] });
      fetchChargers();
    } catch (err) {
      setChargerError('Ekleme başarısız.');
    } finally {
      setChargerLoading(false);
    }
  };

  // Charger çoklu fotoğrafı seçilince backend'e yükle
  const handleChargerImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setChargerImageUploading(true);
    setChargerError('');
    try {
      const uploadedImages = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploadedImages.push(res.data.url);
      }
      setChargerForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedImages] }));
    } catch (err) {
      setChargerError('Fotoğraflar yüklenemedi.');
    } finally {
      setChargerImageUploading(false);
    }
  };

  // Charger fotoğraf silme fonksiyonu
  const handleChargerRemoveImage = (index) => {
    setChargerForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
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
    setEditTvForm({ 
      name: tv.name, 
      brand: tv.brand, 
      price: tv.price, 
      features: tv.features, 
      images: tv.images || [] 
    });
  };
  const handleEditTvFormChange = (e) => {
    setEditTvForm({ ...editTvForm, [e.target.name]: e.target.value });
  };
  const handleEditTvImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setEditTvLoading(true);
    try {
      const uploadedImages = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploadedImages.push(res.data.url);
      }
      setEditTvForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedImages] }));
    } finally {
      setEditTvLoading(false);
    }
  };
  const handleEditTvRemoveImage = (index) => {
    setEditTvForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
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
    setEditLedForm({ 
      name: led.name, 
      brand: led.brand, 
      price: led.price, 
      features: led.features, 
      images: led.images || [] 
    });
  };
  const handleEditLedFormChange = (e) => {
    setEditLedForm({ ...editLedForm, [e.target.name]: e.target.value });
  };
  const handleEditLedImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setEditLedLoading(true);
    try {
      const uploadedImages = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploadedImages.push(res.data.url);
      }
      setEditLedForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedImages] }));
    } finally {
      setEditLedLoading(false);
    }
  };
  const handleEditLedRemoveImage = (index) => {
    setEditLedForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
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
    setEditChargerForm({ 
      name: charger.name, 
      brand: charger.brand, 
      price: charger.price, 
      features: charger.features, 
      images: charger.images || [] 
    });
  };
  const handleEditChargerFormChange = (e) => {
    setEditChargerForm({ ...editChargerForm, [e.target.name]: e.target.value });
  };
  const handleEditChargerImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setEditChargerLoading(true);
    try {
      const uploadedImages = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await axios.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploadedImages.push(res.data.url);
      }
      setEditChargerForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedImages] }));
    } finally {
      setEditChargerLoading(false);
    }
  };
  const handleEditChargerRemoveImage = (index) => {
    setEditChargerForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
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

  // Brand functions
  const fetchBrands = async () => {
    try {
      const res = await axios.get('/api/brand/admin');
      setBrandList(res.data);
    } catch (err) {
      setBrandError('Markalar yüklenemedi.');
    }
  };

  const handleBrandFormChange = (e) => {
    setBrandForm({ ...brandForm, [e.target.name]: e.target.value });
  };

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    setBrandError('');
    setBrandSuccess('');
    setBrandLoading(true);
    if (!brandForm.name) {
      setBrandError('Marka adı zorunludur.');
      setBrandLoading(false);
      return;
    }
    if (!brandForm.image) {
      setBrandError('Lütfen bir resim yükleyin.');
      setBrandLoading(false);
      return;
    }
    try {
      await axios.post('/api/brand', {
        name: brandForm.name,
        image: brandForm.image
      });
      setBrandSuccess('Marka başarıyla eklendi!');
      setBrandForm({ name: '', image: '' });
      fetchBrands();
    } catch (err) {
      setBrandError(err.response?.data?.message || 'Ekleme başarısız.');
    } finally {
      setBrandLoading(false);
    }
  };

  const handleBrandImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBrandImageUploading(true);
    setBrandError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setBrandForm((prev) => ({ ...prev, image: res.data.url }));
    } catch (err) {
      setBrandError('Fotoğraf yüklenemedi.');
    } finally {
      setBrandImageUploading(false);
    }
  };

  const handleDeleteBrand = async (id) => {
    try {
      await axios.delete(`/api/brand/${id}`);
      setBrandList((prev) => prev.filter((brand) => brand._id !== id));
    } catch (err) {
      setBrandError('Silme başarısız.');
    }
  };

  const handleEditBrand = (brand) => {
    setEditingBrandId(brand._id);
    setEditBrandForm({ name: brand.name, image: brand.image, isActive: brand.isActive });
  };

  const handleEditBrandFormChange = (e) => {
    setEditBrandForm({ ...editBrandForm, [e.target.name]: e.target.value });
  };

  const handleEditBrandImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setEditBrandLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setEditBrandForm((prev) => ({ ...prev, image: res.data.url }));
    } catch (err) {
      setBrandError('Fotoğraf yüklenemedi.');
    } finally {
      setEditBrandLoading(false);
    }
  };

  const handleEditBrandSave = async () => {
    setEditBrandLoading(true);
    try {
      const res = await axios.put(`/api/brand/${editingBrandId}`, editBrandForm);
      setBrandList((prev) => prev.map((brand) => brand._id === editingBrandId ? res.data : brand));
      setEditingBrandId(null);
    } catch (err) {
      setBrandError('Güncelleme başarısız.');
    } finally {
      setEditBrandLoading(false);
    }
  };

  const handleEditBrandCancel = () => {
    setEditingBrandId(null);
  };

  const handleToggleBrandStatus = async (id, isActive) => {
    try {
      const res = await axios.put(`/api/brand/${id}`, { isActive });
      setBrandList((prev) => prev.map((brand) => brand._id === id ? res.data : brand));
    } catch (err) {
      setBrandError('Durum güncellenemedi.');
    }
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
            onRemoveImage={handleRemoveImage}
            onEditRemoveImage={handleEditTvRemoveImage}
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
            onRemoveImage={handleLedRemoveImage}
            onEditRemoveImage={handleEditLedRemoveImage}
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
            onRemoveImage={handleChargerRemoveImage}
            onEditRemoveImage={handleEditChargerRemoveImage}
          />
        )}
        {selectedCategory === 'Markalar' && (
          <BrandPanel
            brandList={brandList}
            brandForm={brandForm}
            brandError={brandError}
            brandSuccess={brandSuccess}
            brandLoading={brandLoading}
            brandImageUploading={brandImageUploading}
            editingBrandId={editingBrandId}
            editBrandForm={editBrandForm}
            editBrandLoading={editBrandLoading}
            onBrandFormChange={handleBrandFormChange}
            onBrandSubmit={handleBrandSubmit}
            onBrandImageChange={handleBrandImageChange}
            onEditBrand={handleEditBrand}
            onEditBrandFormChange={handleEditBrandFormChange}
            onEditBrandImageChange={handleEditBrandImageChange}
            onEditBrandSave={handleEditBrandSave}
            onEditBrandCancel={handleEditBrandCancel}
            onDeleteBrand={handleDeleteBrand}
            onToggleBrandStatus={handleToggleBrandStatus}
          />
        )}
        {selectedCategory !== 'Televizyon' && selectedCategory !== 'LED' && selectedCategory !== 'Araç Şarj' && selectedCategory !== 'Markalar' && (
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