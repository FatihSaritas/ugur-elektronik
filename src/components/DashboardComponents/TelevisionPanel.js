import React from 'react';
import { Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, InputAdornment, Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const TelevisionPanel = ({
  tvList, tvForm, tvError, tvSuccess, tvLoading, imageUploading,
  editingTvId, editTvForm, editTvLoading,
  onTvFormChange, onTvSubmit, onImageChange,
  onEditTv, onEditTvFormChange, onEditTvImageChange, onEditTvSave, onEditTvCancel,
  onDeleteTv, onRemoveImage, onEditRemoveImage
}) => (
  <Box sx={{ width: '100%', maxWidth: 700 }}>
    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
      Televizyon Ekle
    </Typography>
    <Paper sx={{ p: 3, mb: 3 }}>
      <form onSubmit={onTvSubmit}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <TextField
            label="Marka"
            name="brand"
            value={tvForm.brand || ''}
            onChange={onTvFormChange}
            required
            sx={{ flex: 1 }}
          />
          <TextField
            label="İsim"
            name="name"
            value={tvForm.name}
            onChange={onTvFormChange}
            required
            sx={{ flex: 1 }}
          />
        </Box>
        <TextField
          label="Özellikler"
          name="features"
          value={tvForm.features}
          onChange={onTvFormChange}
          multiline
          rows={2}
          fullWidth
          sx={{ mt: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            label="Fiyat"
            name="price"
            type="number"
            value={tvForm.price}
            onChange={onTvFormChange}
            required
            sx={{ flex: 1 }}
            InputProps={{
              endAdornment: <InputAdornment position="end"><CurrencyLiraIcon color="primary" /></InputAdornment>
            }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            component="label"
            disabled={imageUploading}
            sx={{ height: 56 }}
            startIcon={<AddPhotoAlternateIcon />}
          >
            {imageUploading ? 'Yükleniyor...' : 'Fotoğraflar Seç'}
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={onImageChange}
            />
          </Button>
          {tvForm.images && tvForm.images.length > 0 && (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tvForm.images.map((image, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <img 
                    src={image} 
                    alt={`Ürün ${index + 1}`} 
                    style={{ 
                      width: 80, 
                      height: 80, 
                      borderRadius: 4, 
                      objectFit: 'cover' 
                    }} 
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      backgroundColor: 'error.main',
                      color: 'white',
                      '&:hover': { backgroundColor: 'error.dark' }
                    }}
                    onClick={() => onRemoveImage(index)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
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
            <TableCell>Marka</TableCell>
            <TableCell>Özellikler</TableCell>
            <TableCell>Fiyat</TableCell>
            <TableCell>Resimler</TableCell>
            <TableCell>İşlem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tvList.map((tv) => (
            <TableRow key={tv._id}>
              {editingTvId === tv._id ? (
                <>
                  <TableCell>
                    <TextField name="brand" value={editTvForm.brand || ''} onChange={onEditTvFormChange} size="small" required />
                  </TableCell>
                  <TableCell>
                    <TextField name="features" value={editTvForm.features} onChange={onEditTvFormChange} size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField name="price" value={editTvForm.price} onChange={onEditTvFormChange} size="small" type="number"
                      InputProps={{ endAdornment: <InputAdornment position="end"><CurrencyLiraIcon color="primary" /></InputAdornment> }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" component="label" size="small" disabled={editTvLoading}>
                      Fotoğraflar Seç
                      <input type="file" accept="image/*" multiple hidden onChange={onEditTvImageChange} />
                    </Button>
                    {editTvForm.images && editTvForm.images.length > 0 && (
                      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {editTvForm.images.map((image, index) => (
                          <Box key={index} sx={{ position: 'relative' }}>
                            <img 
                              src={image} 
                              alt={`Ürün ${index + 1}`} 
                              style={{ 
                                width: 40, 
                                height: 40, 
                                borderRadius: 4, 
                                objectFit: 'cover' 
                              }} 
                            />
                            <IconButton
                              size="small"
                              sx={{
                                position: 'absolute',
                                top: -4,
                                right: -4,
                                backgroundColor: 'error.main',
                                color: 'white',
                                width: 16,
                                height: 16,
                                '&:hover': { backgroundColor: 'error.dark' }
                              }}
                              onClick={() => onEditRemoveImage(index)}
                            >
                              <CloseIcon sx={{ fontSize: 12 }} />
                            </IconButton>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button color="success" onClick={onEditTvSave} disabled={editTvLoading}>Kaydet</Button>
                    <Button color="inherit" onClick={onEditTvCancel} disabled={editTvLoading}>İptal</Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '1.1rem' }}>{tv.brand}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#555', fontWeight: 400 }}>{tv.features}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {tv.price} <CurrencyLiraIcon fontSize="small" />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {tv.images && tv.images.length > 0 ? (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {tv.images.slice(0, 3).map((image, index) => (
                          <img 
                            key={index} 
                            src={image} 
                            alt={`${tv.name} ${index + 1}`} 
                            style={{ 
                              width: 40, 
                              height: 40, 
                              borderRadius: 4, 
                              objectFit: 'cover' 
                            }} 
                          />
                        ))}
                        {tv.images.length > 3 && (
                          <Chip 
                            label={`+${tv.images.length - 3}`} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        )}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">Resim yok</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => onEditTv(tv)}><EditIcon /></Button>
                    <Button color="error" onClick={() => onDeleteTv(tv._id)}><DeleteIcon /></Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default TelevisionPanel; 