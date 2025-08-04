import React from 'react';
import { Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, InputAdornment, Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const ChargerPanel = ({
  chargerList, chargerForm, chargerError, chargerSuccess, chargerLoading, chargerImageUploading,
  editingChargerId, editChargerForm, editChargerLoading,
  onChargerFormChange, onChargerSubmit, onChargerImageChange,
  onEditCharger, onEditChargerFormChange, onEditChargerImageChange, onEditChargerSave, onEditChargerCancel,
  onDeleteCharger, onRemoveImage, onEditRemoveImage
}) => (
  <Box sx={{ width: '100%', maxWidth: 700 }}>
    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
      Şarj Cihazı Ekle
    </Typography>
    <Paper sx={{ p: 3, mb: 3 }}>
      <form onSubmit={onChargerSubmit}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <TextField
            label="Marka"
            name="brand"
            value={chargerForm.brand || ''}
            onChange={onChargerFormChange}
            required
            sx={{ flex: 1 }}
          />
          <TextField
            label="İsim"
            name="name"
            value={chargerForm.name}
            onChange={onChargerFormChange}
            required
            sx={{ flex: 1 }}
          />
        </Box>
        <TextField
          label="Özellikler"
          name="features"
          value={chargerForm.features}
          onChange={onChargerFormChange}
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
            value={chargerForm.price}
            onChange={onChargerFormChange}
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
            disabled={chargerImageUploading}
            sx={{ height: 56 }}
            startIcon={<AddPhotoAlternateIcon />}
          >
            {chargerImageUploading ? 'Yükleniyor...' : 'Fotoğraflar Seç'}
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={onChargerImageChange}
            />
          </Button>
          {chargerForm.images && chargerForm.images.length > 0 && (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {chargerForm.images.map((image, index) => (
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
        {chargerError && <Alert severity="error" sx={{ mt: 2 }}>{chargerError}</Alert>}
        {chargerSuccess && <Alert severity="success" sx={{ mt: 2 }}>{chargerSuccess}</Alert>}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={chargerLoading}>
          {chargerLoading ? 'Ekleniyor...' : 'Ekle'}
        </Button>
      </form>
    </Paper>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
      Kayıtlı Şarj Cihazları
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
          {chargerList.map((charger) => (
            <TableRow key={charger._id}>
              {editingChargerId === charger._id ? (
                <>
                  <TableCell>
                    <TextField name="brand" value={editChargerForm.brand || ''} onChange={onEditChargerFormChange} size="small" required />
                  </TableCell>
                  <TableCell>
                    <TextField name="features" value={editChargerForm.features} onChange={onEditChargerFormChange} size="small" />
                  </TableCell>
                  <TableCell>
                    <TextField name="price" value={editChargerForm.price} onChange={onEditChargerFormChange} size="small" type="number"
                      InputProps={{ endAdornment: <InputAdornment position="end"><CurrencyLiraIcon color="primary" /></InputAdornment> }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" component="label" size="small" disabled={editChargerLoading}>
                      Fotoğraflar Seç
                      <input type="file" accept="image/*" multiple hidden onChange={onEditChargerImageChange} />
                    </Button>
                    {editChargerForm.images && editChargerForm.images.length > 0 && (
                      <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {editChargerForm.images.map((image, index) => (
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
                    <Button color="success" onClick={onEditChargerSave} disabled={editChargerLoading}>Kaydet</Button>
                    <Button color="inherit" onClick={onEditChargerCancel} disabled={editChargerLoading}>İptal</Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '1.1rem' }}>{charger.brand}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#555', fontWeight: 400 }}>{charger.features}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {charger.price} <CurrencyLiraIcon fontSize="small" />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {charger.images && charger.images.length > 0 ? (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {charger.images.slice(0, 3).map((image, index) => (
                          <img 
                            key={index} 
                            src={image} 
                            alt={`${charger.name} ${index + 1}`} 
                            style={{ 
                              width: 40, 
                              height: 40, 
                              borderRadius: 4, 
                              objectFit: 'cover' 
                            }} 
                          />
                        ))}
                        {charger.images.length > 3 && (
                          <Chip 
                            label={`+${charger.images.length - 3}`} 
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
                    <Button color="primary" onClick={() => onEditCharger(charger)}><EditIcon /></Button>
                    <Button color="error" onClick={() => onDeleteCharger(charger._id)}><DeleteIcon /></Button>
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

export default ChargerPanel; 