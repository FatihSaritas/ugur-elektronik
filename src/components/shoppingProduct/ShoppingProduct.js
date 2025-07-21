import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography, List, ListItem, ListItemText, Divider, Paper, Avatar, CircularProgress } from '@mui/material'
import TvIcon from '@mui/icons-material/Tv';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import '../../assets/css/shopping/Shopping.css'
import axios from 'axios';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCategory === 'Televizyon') {
      fetchTelevisions();
    }
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

  // Kategoriye göre ürünleri belirle
  let productsToShow = staticProducts;
  if (selectedCategory === 'Televizyon') {
    productsToShow = tvProducts.map(tv => ({
      name: tv.name,
      price: tv.price + ' TL',
      img: tv.image,
      features: tv.features
    }));
  }

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
            {selectedCategory === 'Televizyon' && loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={2}>
                {productsToShow.length === 0 ? (
                  <Grid item xs={12}>
                    <Typography variant="body1" color="text.secondary" align="center">Ürün bulunamadı.</Typography>
                  </Grid>
                ) : (
                  productsToShow.map((product, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Paper className="shopping-product-card" elevation={3}>
                        <Box className="product-image-container">
                          {product.img ? (
                            <img src={product.img} alt={product.name} className="product-image" />
                          ) : (
                            <Box sx={{ width: 90, height: 90, bgcolor: '#eee', borderRadius: 2 }} />
                          )}
                        </Box>
                        <Typography variant="subtitle1" className="product-name">{product.name}</Typography>
                        <Typography variant="subtitle2" className="product-price">{product.price}</Typography>
                        {product.features && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{product.features}</Typography>
                        )}
                      </Paper>
                    </Grid>
                  ))
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default ShoppingProduct