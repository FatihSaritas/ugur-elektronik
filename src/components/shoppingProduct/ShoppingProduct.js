import React, { useState, useEffect, useRef } from 'react'
import { Box, Grid, Typography, List, ListItem, ListItemText, Divider, Paper, Avatar, CircularProgress, TextField, MenuItem, InputAdornment, Chip, IconButton, Dialog, DialogContent, DialogActions, Button } from '@mui/material'
import TvIcon from '@mui/icons-material/Tv';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import '../../assets/css/shopping/Shopping.css'
import api from '../../config/axios';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import { fixImageUrls, getFallbackImage } from '../../utils/imageUtils';

const categories = [
  { name: 'Televizyon', icon: <TvIcon className="category-icon" /> },
  { name: 'LED', icon: <FlashOnIcon className="category-icon" /> },
  { name: 'Şarj Cihazı', icon: <DirectionsCarIcon className="category-icon" /> },
];

const productImage = require('../../assets/img/Product/dijıtsu.jpg');
const staticProducts = [
  { name: 'Samsung 4K TV', price: '15.000 TL', img: productImage },
  { name: 'LG LED Panel', price: '2.500 TL', img: productImage },
  { name: 'Sony Şarj Cihazı', price: '1.200 TL', img: productImage },
  { name: 'Arçelik Elektrik Pano', price: '3.000 TL', img: productImage },
];

function ShoppingProduct() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Televizyon');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [tvProducts, setTvProducts] = useState([]);
  const [ledProducts, setLedProducts] = useState([]);
  const [chargerProducts, setChargerProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const PRODUCTS_PER_PAGE = 6;
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [showCategories, setShowCategories] = useState(window.innerWidth > 630);
  const [showBrands, setShowBrands] = useState(window.innerWidth > 630);
  
  // Fotoğraf galerisi için state'ler
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  
  // Kaydırma için state'ler
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  
  const galleryRef = useRef(null);
  
  // Markalar state'i
  const [brands, setBrands] = useState([
    { name: 'Samsung', img: require('../../assets/img/Brands/samsung.png') },
    { name: 'LG', img: require('../../assets/img/Brands/lg.png') },
    { name: 'Sony', img: require('../../assets/img/Brands/sony.png') },
    { name: 'Arçelik', img: require('../../assets/img/Brands/arcelik.jpeg') },
    { name: 'Vestel', img: require('../../assets/img/Brands/vestel.jpeg') },
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 630) {
        setShowCategories(true);
        setShowBrands(true);
      } else {
        setShowCategories(false);
        setShowBrands(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Markaları fetch et
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await api.get('/api/brand');
        if (res.data && res.data.length > 0) {
          const apiBrands = res.data.map(brand => ({
            name: brand.name,
            img: brand.image
          }));
          setBrands(apiBrands);
        }
      } catch (err) {
        console.error('Markalar yüklenemedi:', err);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Televizyon') {
      fetchTelevisions();
    } else if (selectedCategory === 'LED') {
      fetchLeds();
    } else if (selectedCategory === 'Şarj Cihazı') {
      fetchChargers();
    }
    setPage(1);
    setSelectedBrand(null);
  }, [selectedCategory]);

  const fetchTelevisions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/television');
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
      const res = await api.get('/api/led');
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
      const res = await api.get('/api/charger');
      setChargerProducts(res.data);
    } catch (err) {
      setChargerProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandSelect = (brandName) => {
    // Eğer aynı markaya tekrar tıklanırsa filtreyi kaldır
    if (selectedBrand === brandName) {
      setSelectedBrand(null);
    } else {
      // Farklı bir markaya tıklanırsa o markayı seç
      setSelectedBrand(brandName);
    }
    setPage(1);
  };

  // Fotoğraf galerisi fonksiyonları
  const openGallery = (product, imageIndex = 0) => {
    setSelectedProduct(product);
    setCurrentImageIndex(imageIndex);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setSelectedProduct(null);
    setCurrentImageIndex(0);
    setDragOffset(0);
    setIsDragging(false);
  };

  const nextImage = () => {
    if (selectedProduct && selectedProduct.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct && selectedProduct.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  // Touch events için fonksiyonlar
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mouse drag events için fonksiyonlar
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragStart) return;
    
    const offset = e.clientX - dragStart;
    setDragOffset(offset);
  };

  const handleMouseUp = (e) => {
    if (!isDragging || !dragStart) return;
    
    const distance = e.clientX - dragStart;
    const isLeftSwipe = distance < -50;
    const isRightSwipe = distance > 50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }

    setIsDragging(false);
    setDragStart(null);
    setDragOffset(0);
  };

  // Tüm ürünleri getir (kategori sınırlaması olmadan)
  const getAllProducts = () => {
    const allProducts = [];
    
    // Televizyon ürünleri
    tvProducts.forEach(tv => {
      allProducts.push({
        id: tv._id,
        name: tv.name,
        brand: tv.brand,
        price: tv.price + ' TL',
        priceRaw: Number(tv.price),
        images: fixImageUrls(tv.images || []),
        features: tv.features,
        category: 'Televizyon'
      });
    });
    
    // LED ürünleri
    ledProducts.forEach(led => {
      allProducts.push({
        id: led._id,
        name: led.name,
        brand: led.brand,
        price: led.price + ' TL',
        priceRaw: Number(led.price),
        images: fixImageUrls(led.images || []),
        features: led.features,
        category: 'LED'
      });
    });
    
    // Şarj Cihazı ürünleri
    chargerProducts.forEach(charger => {
      allProducts.push({
        id: charger._id,
        name: charger.name,
        brand: charger.brand,
        price: charger.price + ' TL',
        priceRaw: Number(charger.price),
        images: fixImageUrls(charger.images || []),
        features: charger.features,
        category: 'Şarj Cihazı'
      });
    });
    
    return allProducts;
  };

  // Mevcut ürünleri getir (kategori bazlı)
  const getCurrentProducts = () => {
    if (selectedCategory === 'Televizyon') {
      return tvProducts.map(tv => ({
        id: tv._id,
        name: tv.name,
        brand: tv.brand,
        price: tv.price + ' TL',
        priceRaw: Number(tv.price),
        images: fixImageUrls(tv.images || []),
        features: tv.features,
        category: 'Televizyon'
      }));
    } else if (selectedCategory === 'LED') {
      return ledProducts.map(led => ({
        id: led._id,
        name: led.name,
        brand: led.brand,
        price: led.price + ' TL',
        priceRaw: Number(led.price),
        images: fixImageUrls(led.images || []),
        features: led.features,
        category: 'LED'
      }));
    } else if (selectedCategory === 'Şarj Cihazı') {
      return chargerProducts.map(charger => ({
        id: charger._id,
        name: charger.name,
        brand: charger.brand,
        price: charger.price + ' TL',
        priceRaw: Number(charger.price),
        images: fixImageUrls(charger.images || []),
        features: charger.features,
        category: 'Şarj Cihazı'
      }));
    }
    return staticProducts;
  };

  // Marka seçiliyse tüm ürünlerden filtrele, değilse kategori bazlı göster
  let productsToShow = selectedBrand ? getAllProducts() : getCurrentProducts();

  if (selectedBrand) {
    productsToShow = productsToShow.filter(product => {
      if (!product.brand) return false;
      
      // Büyük/küçük harf duyarlı tam eşleşme kontrolü
      const productBrand = product.brand.trim();
      const selectedBrandTrimmed = selectedBrand.trim();
      
      // Tam eşleşme kontrolü (büyük/küçük harf duyarlı)
      return productBrand === selectedBrandTrimmed;
    });
  }

  if (search.trim() !== '') {
    const s = search.trim().toLowerCase();
    productsToShow = productsToShow.filter(p =>
      p.name.toLowerCase().includes(s) || (p.features && p.features.toLowerCase().includes(s))
    );
  }

  if (sort === 'price-asc') {
    productsToShow = [...productsToShow].sort((a, b) => a.priceRaw - b.priceRaw);
  } else if (sort === 'price-desc') {
    productsToShow = [...productsToShow].sort((a, b) => b.priceRaw - a.priceRaw);
  }

  const pageCount = Math.ceil(productsToShow.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = productsToShow.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleProductClick = (product) => {
    let categoryPath = '';
    // Ürünün kendi kategorisini kullan, eğer yoksa seçili kategoriyi kullan
    const productCategory = product.category || selectedCategory;
    
    switch (productCategory) {
      case 'Televizyon':
        categoryPath = 'television';
        break;
      case 'LED':
        categoryPath = 'led';
        break;
      case 'Şarj Cihazı':
        categoryPath = 'charger';
        break;
      default:
        return;
    }
    
    if (product.id) {
      navigate(`/product/${categoryPath}/${product.id}`);
    }
  };

  return (
    <Box className="shopping-main-container">
      <Paper elevation={3} className="shopping-outer-container">
        <div className="shopping-layout">
          <div className="shopping-sidebar">
            <div className="sidebar-section">
              <div
                className={`sidebar-title sidebar-accordion-title${showCategories ? ' open' : ''}`}
                onClick={() => {
                  if (window.innerWidth <= 630) setShowCategories(v => !v);
                }}
                style={{ cursor: window.innerWidth <= 630 ? 'pointer' : 'default', display: 'flex', alignItems: 'center', userSelect: 'none' }}
              >
                Kategoriler
                <span className={`accordion-arrow${showCategories ? ' open' : ''}`}>{window.innerWidth <= 630 ? (showCategories ? '▲' : '▼') : ''}</span>
              </div>
              {(showCategories || window.innerWidth > 630) && (
                <List className="sidebar-accordion-list">
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
              )}
            </div>
            <Divider sx={{ my: 2 }} />
            <div className="sidebar-section">
              <div
                className={`sidebar-title sidebar-accordion-title${showBrands ? ' open' : ''}`}
                onClick={() => {
                  if (window.innerWidth <= 630) setShowBrands(v => !v);
                }}
                style={{ cursor: window.innerWidth <= 630 ? 'pointer' : 'default', display: 'flex', alignItems: 'center', userSelect: 'none' }}
              >
                Markalar
                <span className={`accordion-arrow${showBrands ? ' open' : ''}`}>{window.innerWidth <= 630 ? (showBrands ? '▲' : '▼') : ''}</span>
              </div>
              {(showBrands || window.innerWidth > 630) && (
                <List className="sidebar-accordion-list">
                  {brands.map((brand, idx) => (
                    <ListItem 
                      button 
                      key={idx} 
                      className="sidebar-list-item"
                      selected={selectedBrand === brand.name}
                      onClick={() => handleBrandSelect(brand.name)}
                    >
                      <Avatar src={brand.img} alt={brand.name} className="brand-logo" sx={{ width: 24, height: 24, marginRight: 1 }} />
                      <ListItemText primary={brand.name} />
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, alignItems: 'center', justifyContent: 'space-between', }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', flex: 1 }}>
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
                {selectedBrand && (
                  <Chip
                    label={selectedBrand}
                    onDelete={() => setSelectedBrand(null)}
                    deleteIcon={<CloseIcon />}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                )}
              </Box>
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
                    <div>
                      <Typography variant="body1" color="text.secondary" align="center">
                        {selectedBrand ? `${selectedBrand} markasına ait ürün bulunamadı.` : 'Ürün bulunamadı.'}
                      </Typography>
                    </div>
                  ) : (
                    <div className="shopping-products-grid">
                      {paginatedProducts.map((product, idx) => {
                        const hasMultipleImages = product.images && product.images.length > 1;
                        
                        return (
                          <div key={idx}>
                            <Paper 
                              className="shopping-product-card" 
                              elevation={3}
                              onClick={() => handleProductClick(product)}
                              sx={{ 
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: 6
                                }
                              }}
                            >
                              <Box className="product-image-container">
                                {product.images && product.images.length > 0 ? (
                                  <Box 
                                    sx={{ 
                                      position: 'relative', 
                                      width: '100%', 
                                      height: '100%',
                                      cursor: 'pointer',
                                      overflow: 'hidden'
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (hasMultipleImages) {
                                        openGallery(product, 0);
                                      }
                                    }}
                                  >
                                    <img 
                                      src={product.images[0]} 
                                      alt={product.name} 
                                      className="product-image" 
                                      style={{ 
                                        cursor: 'pointer',
                                        userSelect: 'none'
                                      }}
                                      onError={(e) => {
                                        console.error('Görsel yüklenemedi:', product.images[0]);
                                        console.error('Hata detayı:', e.target.error);
                                        // Fallback görsel göster
                                        e.target.src = getFallbackImage();
                                      }}
                                      onLoad={(e) => {
                                        console.log('Görsel başarıyla yüklendi:', product.images[0]);
                                        console.log('Görsel boyutları:', e.target.naturalWidth, 'x', e.target.naturalHeight);
                                      }}
                                    />
                                    {hasMultipleImages && (
                                      <Box sx={{ 
                                        position: 'absolute', 
                                        top: 8, 
                                        right: 8, 
                                        backgroundColor: 'rgba(0,0,0,0.7)', 
                                        color: 'white', 
                                        borderRadius: '50%', 
                                        width: 24, 
                                        height: 24, 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                      }}>
                                        +{product.images.length - 1}
                                      </Box>
                                    )}
                                  </Box>
                                ) : (
                                  <Box sx={{ width: 160, height: 160, bgcolor: '#eee', borderRadius: 2 }} />
                                )}
                              </Box>
                              <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                width: '100%', 
                                height: '100%',
                                justifyContent: 'space-between'
                              }}>
                                <Box sx={{ 
                                  display: 'flex', 
                                  flexDirection: 'column', 
                                  alignItems: 'center', 
                                  width: '100%'
                                }}>
                                  {product.brand && (
                                    <Typography className="product-brand">{product.brand}</Typography>
                                  )}
                                  <Typography variant="subtitle1" className="product-name">{product.name}</Typography>
                                  {product.features && (
                                    <Typography className="product-features">{product.features}</Typography>
                                  )}
                                </Box>
                                <Typography className="product-price">{product.price}</Typography>
                              </Box>
                            </Paper>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Grid>
                {pageCount > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" shape="rounded" />
                  </Box>
                )}
              </>
            )}
          </div>
        </div>
      </Paper>

      {/* Fotoğraf Galerisi Dialog */}
      <Dialog 
        open={galleryOpen} 
        onClose={closeGallery}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          {selectedProduct && selectedProduct.images && selectedProduct.images.length > 0 && (
            <Box
              ref={galleryRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              sx={{ 
                position: 'relative',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none'
              }}
            >
              <img 
                src={selectedProduct.images[currentImageIndex]} 
                alt={`${selectedProduct.name} ${currentImageIndex + 1}`}
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '70vh', 
                  objectFit: 'contain',
                  transform: isDragging ? `translateX(${dragOffset}px)` : 'translateX(0)',
                  transition: isDragging ? 'none' : 'transform 0.3s ease'
                }} 
              />
              {selectedProduct.images.length > 1 && (
                <>
                  <IconButton
                    onClick={prevImage}
                    sx={{
                      position: 'absolute',
                      left: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
                    }}
                  >
                    <NavigateBeforeIcon />
                  </IconButton>
                  <IconButton
                    onClick={nextImage}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
                    }}
                  >
                    <NavigateNextIcon />
                  </IconButton>
                  <Box sx={{ 
                    position: 'absolute', 
                    bottom: 16, 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 1
                  }}>
                    {selectedProduct.images.map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: index === currentImageIndex ? 'white' : 'rgba(255,255,255,0.5)',
                          cursor: 'pointer'
                        }}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </Box>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={closeGallery} color="primary">
            Kapat
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </Box>
  )
}

export default ShoppingProduct