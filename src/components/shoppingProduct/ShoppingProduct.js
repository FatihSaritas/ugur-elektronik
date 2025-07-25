import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography, List, ListItem, ListItemText, Divider, Paper, Avatar, CircularProgress, TextField, MenuItem, InputAdornment } from '@mui/material'
import TvIcon from '@mui/icons-material/Tv';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SearchIcon from '@mui/icons-material/Search';
import '../../assets/css/shopping/Shopping.css'
import axios from 'axios';
import Pagination from '@mui/material/Pagination';

const categories = [
  { name: 'Televizyon', icon: <TvIcon className="category-icon" /> },
  { name: 'LED', icon: <FlashOnIcon className="category-icon" /> },
  { name: 'Şarj Cihazı', icon: <DirectionsCarIcon className="category-icon" /> },
];
const brands = [
  { name: 'Samsung', img: require('../../assets/img/Brands/samsung.png') },
  { name: 'LG', img: require('../../assets/img/Brands/lg.png') },
  { name: 'Sony', img: require('../../assets/img/Brands/sony.png') },
  { name: 'Arçelik', img: require('../../assets/img/Brands/arcelik.jpeg') },
  { name: 'Vestel', img: require('../../assets/img/Brands/vestel.jpeg') },
];
const productImage = require('../../assets/img/Product/dijıtsu.jpg');
const staticProducts = [
  { name: 'Samsung 4K TV', price: '15.000 TL', img: productImage },
  { name: 'LG LED Panel', price: '2.500 TL', img: productImage },
  { name: 'Sony Şarj Cihazı', price: '1.200 TL', img: productImage },
  { name: 'Arçelik Elektrik Pano', price: '3.000 TL', img: productImage },
];

function ShoppingProduct() {
  const [selectedCategory, setSelectedCategory] = useState('Televizyon');
  const [tvProducts, setTvProducts] = useState([]);
  const [ledProducts, setLedProducts] = useState([]);
  const [chargerProducts, setChargerProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 6;
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default'); // 'default', 'price-asc', 'price-desc'

  useEffect(() => {
    if (selectedCategory === 'Televizyon') {
      fetchTelevisions();
    } else if (selectedCategory === 'LED') {
      fetchLeds();
    } else if (selectedCategory === 'Şarj Cihazı') {
      fetchChargers();
    }
    setPage(1); // Kategori değişince ilk sayfaya dön
    // eslint-disable-next-line
  }, [selectedCategory]);

  const fetchTelevisions = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/television');
      setTvProducts(res.data);
    } catch (err) {
      setTvProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeds = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/led');
      setLedProducts(res.data);
    } catch (err) {
      setLedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchChargers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/charger');
      setChargerProducts(res.data);
    } catch (err) {
      setChargerProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Kategoriye göre ürünleri belirle
  let productsToShow = staticProducts;
  if (selectedCategory === 'Televizyon') {
    productsToShow = tvProducts.map(tv => ({
      name: tv.name,
      brand: tv.brand, // eklendi
      price: tv.price + ' TL',
      priceRaw: Number(tv.price),
      img: tv.image,
      features: tv.features
    }));
  } else if (selectedCategory === 'LED') {
    productsToShow = ledProducts.map(led => ({
      name: led.name,
      brand: led.brand, // eklendi
      price: led.price + ' TL',
      priceRaw: Number(led.price),
      img: led.image,
      features: led.features
    }));
  } else if (selectedCategory === 'Şarj Cihazı') {
    productsToShow = chargerProducts.map(charger => ({
      name: charger.name,
      brand: charger.brand, // eklendi
      price: charger.price + ' TL',
      priceRaw: Number(charger.price),
      img: charger.image,
      features: charger.features
    }));
  }

  // Arama filtresi uygula
  if (search.trim() !== '') {
    const s = search.trim().toLowerCase();
    productsToShow = productsToShow.filter(p =>
      p.name.toLowerCase().includes(s) || (p.features && p.features.toLowerCase().includes(s))
    );
  }

  // Sıralama uygula
  if (sort === 'price-asc') {
    productsToShow = [...productsToShow].sort((a, b) => a.priceRaw - b.priceRaw);
  } else if (sort === 'price-desc') {
    productsToShow = [...productsToShow].sort((a, b) => b.priceRaw - a.priceRaw);
  }

  // Pagination işlemi
  const pageCount = Math.ceil(productsToShow.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = productsToShow.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box className="shopping-main-container">
      <Paper elevation={3} className="shopping-outer-container">
        <Grid container spacing={2}>
          {/* Sol Panel */}
          <Grid item xs={12} md={3}>
            <Paper className="shopping-sidebar" elevation={2}>
              <Typography variant="h6" className="sidebar-title">Kategoriler</Typography>
              <List>
                {categories.map((cat, idx) => (
                  <ListItem
                    button
                    key={idx}
                    className="sidebar-list-item"
                    selected={selectedCategory === cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                  >
                    {cat.icon}
                    <ListItemText primary={cat.name} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" className="sidebar-title">Markalar</Typography>
              <List>
                {brands.map((brand, idx) => (
                  <ListItem button key={idx} className="sidebar-list-item">
                    <Avatar src={brand.img} alt={brand.name} className="brand-logo" sx={{ width: 24, height: 24, marginRight: 1 }} />
                    <ListItemText primary={brand.name} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          {/* Sağ Panel */}
          <Grid item xs={12} md={9}>
            {/* Filtreleme ve arama barı */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, alignItems: 'center', justifyContent: 'space-between' }}>
              <TextField
                placeholder="Ürün adı veya açıklama ara..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                size="small"
                sx={{ minWidth: 220, flex: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                select
                label="Fiyata göre sırala"
                value={sort}
                onChange={e => setSort(e.target.value)}
                size="small"
                sx={{ minWidth: 180 }}
              >
                <MenuItem value="default">Varsayılan</MenuItem>
                <MenuItem value="price-asc">Fiyat: Artan</MenuItem>
                <MenuItem value="price-desc">Fiyat: Azalan</MenuItem>
              </TextField>
            </Box>
            {selectedCategory === 'Televizyon' && loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Grid container spacing={2}>
                  {paginatedProducts.length === 0 ? (
                    <Grid item xs={12}>
                      <Typography variant="body1" color="text.secondary" align="center">Ürün bulunamadı.</Typography>
                    </Grid>
                  ) : (
                    paginatedProducts.map((product, idx) => (
                      <Grid item xs={12} sm={6} md={4} key={idx}>
                        <Paper className="shopping-product-card" elevation={3}>
                          <Box className="product-image-container">
                            {product.img ? (
                              <img src={product.img} alt={product.name} className="product-image" />
                            ) : (
                              <Box sx={{ width: 160, height: 160, bgcolor: '#eee', borderRadius: 2 }} />
                            )}
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, width: '100%', height: '100%' }}>
                            {product.brand && (
                              <Typography className="product-brand">{product.brand}</Typography>
                            )}
                            <Typography variant="subtitle1" className="product-name">{product.name}</Typography>
                            {product.features && (
                              <Typography className="product-features">{product.features}</Typography>
                            )}
                            <Box sx={{ flexGrow: 1 }} />
                            <Typography className="product-price">{product.price}</Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))
                  )}
                </Grid>
                {pageCount > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" shape="rounded" />
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default ShoppingProduct