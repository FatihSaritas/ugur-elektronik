import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  CircularProgress, 
  Container,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../assets/css/ProductDetails.css';

function ProductDetails() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Galeri için state'ler
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let endpoint = '';
        switch (category) {
          case 'television':
            endpoint = `/api/television/${id}`;
            break;
          case 'led':
            endpoint = `/api/led/${id}`;
            break;
          case 'charger':
            endpoint = `/api/charger/${id}`;
            break;
          default:
            setError('Geçersiz kategori');
            setLoading(false);
            return;
        }

        const response = await axios.get(endpoint);
        setProduct(response.data);
      } catch (err) {
        console.error('Ürün yüklenirken hata:', err);
        setError(err.response?.data?.message || 'Ürün yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    if (id && category) {
      fetchProduct();
    }
  }, [id, category]);

  const handleBackToShopping = () => {
    navigate('/Shopping');
  };

  // Galeri fonksiyonları
  const openGallery = (index = 0) => {
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const nextImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" color="error" gutterBottom>
              Hata
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {error}
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleBackToShopping}
              startIcon={<ArrowBackIcon />}
              sx={{ mt: 2 }}
            >
              Alışveriş Sayfasına Dön
            </Button>
          </Box>
        </Container>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              Ürün Bulunamadı
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleBackToShopping}
              startIcon={<ArrowBackIcon />}
              sx={{ mt: 2 }}
            >
              Alışveriş Sayfasına Dön
            </Button>
          </Box>
        </Container>
      </div>
    );
  }

  const hasMultipleImages = product.images && product.images.length > 1;

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Button 
          variant="outlined" 
          onClick={handleBackToShopping}
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Alışveriş Sayfasına Dön
        </Button>

        <Paper elevation={3} sx={{ p: 4 }}>
          {/* Ürün Görselleri - En Üstte */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            mb: 4,
            flexDirection: 'column',
            gap: 2
          }}>
            {/* Ana Görsel */}
            <Box sx={{ 
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[currentImageIndex]} 
                  alt={product.name}
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '500px', 
                    objectFit: 'contain',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    cursor: hasMultipleImages ? 'pointer' : 'default'
                  }}
                  onClick={() => hasMultipleImages && openGallery(currentImageIndex)}
                />
              ) : (
                <Box 
                  sx={{ 
                    width: '100%', 
                    height: '400px', 
                    bgcolor: '#f5f5f5', 
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Görsel Yok
                  </Typography>
                </Box>
              )}
              
              {/* Fotoğraf sayısı göstergesi */}
              {hasMultipleImages && (
                <Box sx={{ 
                  position: 'absolute', 
                  top: 16, 
                  right: 16, 
                  backgroundColor: 'rgba(0,0,0,0.7)', 
                  color: 'white', 
                  borderRadius: '20px', 
                  px: 2, 
                  py: 1,
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {currentImageIndex + 1} / {product.images.length}
                </Box>
              )}
            </Box>

            {/* Küçük Fotoğraflar (Thumbnails) */}
            {hasMultipleImages && (
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                maxWidth: '100%'
              }}>
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 1,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: index === currentImageIndex ? '3px solid #3498db' : '1px solid #ddd',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        borderColor: '#3498db'
                      }
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}

            {/* Navigasyon Butonları */}
            {hasMultipleImages && (
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                mt: 2 
              }}>
                <IconButton
                  onClick={() => prevImage()}
                  sx={{
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    '&:hover': { backgroundColor: 'rgba(52, 152, 219, 0.2)' }
                  }}
                >
                  <NavigateBeforeIcon />
                </IconButton>
                <IconButton
                  onClick={() => nextImage()}
                  sx={{
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    '&:hover': { backgroundColor: 'rgba(52, 152, 219, 0.2)' }
                  }}
                >
                  <NavigateNextIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Ayırıcı Çizgi */}
          <Box sx={{ 
            width: '100%', 
            height: '2px', 
            bgcolor: '#3498db', 
            mb: 3 
          }} />

          {/* Ürün Bilgileri - Tablo Formatında */}
          <Box sx={{ 
            bgcolor: '#f8f9fa', 
            borderRadius: 2, 
            p: { xs: 2, lg: 3 },
            border: '1px solid #e9ecef'
          }}>
            <Typography variant="h5" gutterBottom sx={{ 
              fontWeight: 'bold', 
              color: '#2c3e50',
              mb: { xs: 1.5, sm: 2, lg: 3 },
              textAlign: 'center',
              borderBottom: '2px solid #3498db',
              pb: 1,
              fontSize: { xs: '1.2rem', sm: '1.4rem', lg: '1.75rem' }
            }}>
              Ürün Detayları
            </Typography>
            
            {/* Mobil ve Tablet için Özel Tasarım */}
            <Box sx={{ 
              display: { xs: 'block', lg: 'flex' },
              flexDirection: 'column',
              width: '100%',
              gap: { xs: 2, sm: 2.5, lg: 2 }
            }}>
              {/* Marka */}
              <Box sx={{ 
                display: { xs: 'block', lg: 'flex' },
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: { xs: 'flex-start', lg: 'center' },
                py: { xs: 2, lg: 2 },
                px: { xs: 3, lg: 0 },
                bgcolor: { xs: '#fff', lg: 'transparent' },
                borderRadius: { xs: 2, lg: 0 },
                border: { xs: '1px solid #e9ecef', lg: 'none' },
                borderBottom: { xs: 'none', lg: '1px solid #dee2e6' },
                gap: { xs: 1, lg: 2 },
                mb: { xs: 2, lg: 0 }
              }}>
                <Box sx={{ 
                  width: { xs: '100%', lg: '120px' },
                  fontWeight: 'bold', 
                  color: '#495057',
                  mb: { xs: 1, lg: 0 }
                }}>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', lg: '1rem' },
                    color: '#2c3e50'
                  }}>
                    Marka:
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ 
                    fontSize: { xs: '1rem', lg: '1.1rem' },
                    color: '#495057'
                  }}>
                    {product.brand || 'Belirtilmemiş'}
                  </Typography>
                </Box>
              </Box>

              {/* Ürün Adı */}
              <Box sx={{ 
                display: { xs: 'block', lg: 'flex' },
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: { xs: 'flex-start', lg: 'center' },
                py: { xs: 2, lg: 2 },
                px: { xs: 3, lg: 0 },
                bgcolor: { xs: '#fff', lg: 'transparent' },
                borderRadius: { xs: 2, lg: 0 },
                border: { xs: '1px solid #e9ecef', lg: 'none' },
                borderBottom: { xs: 'none', lg: '1px solid #dee2e6' },
                gap: { xs: 1, lg: 2 },
                mb: { xs: 2, lg: 0 }
              }}>
                <Box sx={{ 
                  width: { xs: '100%', lg: '120px' },
                  fontWeight: 'bold', 
                  color: '#495057',
                  mb: { xs: 1, lg: 0 }
                }}>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', lg: '1rem' },
                    color: '#2c3e50'
                  }}>
                    Ürün Adı:
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ 
                    fontSize: { xs: '1rem', lg: '1.1rem' },
                    color: '#495057',
                    fontWeight: '500'
                  }}>
                    {product.name}
                  </Typography>
                </Box>
              </Box>

              {/* Fiyat */}
              <Box sx={{ 
                display: { xs: 'block', lg: 'flex' },
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: { xs: 'flex-start', lg: 'center' },
                py: { xs: 2, lg: 2 },
                px: { xs: 3, lg: 0 },
                bgcolor: { xs: '#fff', lg: 'transparent' },
                borderRadius: { xs: 2, lg: 0 },
                border: { xs: '1px solid #e9ecef', lg: 'none' },
                borderBottom: { xs: 'none', lg: '1px solid #dee2e6' },
                gap: { xs: 1, lg: 2 },
                mb: { xs: 2, lg: 0 }
              }}>
                <Box sx={{ 
                  width: { xs: '100%', lg: '120px' },
                  fontWeight: 'bold', 
                  color: '#495057',
                  mb: { xs: 1, lg: 0 }
                }}>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', lg: '1rem' },
                    color: '#2c3e50'
                  }}>
                    Fiyat:
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ 
                    color: '#e74c3c',
                    fontWeight: 'bold',
                    fontSize: { xs: '1.2rem', lg: '1.4rem' }
                  }}>
                    {product.price} TL
                  </Typography>
                </Box>
              </Box>

              {/* Özellikler */}
              {product.features && (
                <Box sx={{ 
                  display: { xs: 'block', lg: 'flex' },
                  flexDirection: { xs: 'column', lg: 'row' },
                  alignItems: { xs: 'flex-start', lg: 'flex-start' },
                  py: { xs: 2, lg: 2 },
                  px: { xs: 3, lg: 0 },
                  bgcolor: { xs: '#fff', lg: 'transparent' },
                  borderRadius: { xs: 2, lg: 0 },
                  border: { xs: '1px solid #e9ecef', lg: 'none' },
                  gap: { xs: 1, lg: 2 },
                  mb: { xs: 2, lg: 0 }
                }}>
                  <Box sx={{ 
                    width: { xs: '100%', lg: '120px' },
                    fontWeight: 'bold', 
                    color: '#495057',
                    mb: { xs: 1, lg: 0 }
                  }}>
                    <Typography variant="body1" sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '1rem', lg: '1rem' },
                      color: '#2c3e50'
                    }}>
                      Özellikler:
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ 
                      fontSize: { xs: '0.9rem', lg: '1rem' },
                      color: '#495057',
                      lineHeight: 1.6
                    }}>
                      {product.features}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Eklenme Tarihi */}
              <Box sx={{ 
                display: { xs: 'block', lg: 'flex' },
                flexDirection: { xs: 'column', lg: 'row' },
                alignItems: { xs: 'flex-start', lg: 'center' },
                py: { xs: 2, lg: 2 },
                px: { xs: 3, lg: 0 },
                bgcolor: { xs: '#fff', lg: 'transparent' },
                borderRadius: { xs: 2, lg: 0 },
                gap: { xs: 1, lg: 2 }
              }}>
                <Box sx={{ 
                  width: { xs: '100%', lg: '120px' },
                  fontWeight: 'bold', 
                  color: '#495057',
                  mb: { xs: 1, lg: 0 }
                }}>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', lg: '1rem' },
                    color: '#2c3e50'
                  }}>
                    Eklenme Tarihi:
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ 
                    fontSize: { xs: '0.9rem', lg: '1rem' },
                    color: '#6c757d'
                  }}>
                    {new Date(product.createdAt).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Galeri Modal */}
      <Dialog 
        open={galleryOpen} 
        onClose={closeGallery}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          {product && product.images && product.images.length > 0 && (
            <Box sx={{ position: 'relative' }}>
              <img 
                src={product.images[currentImageIndex]} 
                alt={`${product.name} ${currentImageIndex + 1}`}
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '80vh', 
                  objectFit: 'contain'
                }} 
              />
              {product.images.length > 1 && (
                <>
                  <IconButton
                    onClick={prevImage}
                    sx={{
                      position: 'absolute',
                      left: 16,
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
                      right: 16,
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
                    {product.images.map((_, index) => (
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
    </div>
  );
}

export default ProductDetails; 