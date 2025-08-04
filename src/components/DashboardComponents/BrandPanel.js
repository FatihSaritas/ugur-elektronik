import React from 'react';
import { Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, Switch, FormControlLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const BrandPanel = ({
  brandList, brandForm, brandError, brandSuccess, brandLoading, brandImageUploading,
  editingBrandId, editBrandForm, editBrandLoading,
  onBrandFormChange, onBrandSubmit, onBrandImageChange,
  onEditBrand, onEditBrandFormChange, onEditBrandImageChange, onEditBrandSave, onEditBrandCancel,
  onDeleteBrand, onToggleBrandStatus
}) => (
  <Box sx={{ width: '100%', maxWidth: 800 }}>
    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
      Marka Ekle (Alışveriş Sayfası İçin)
    </Typography>
    <Paper sx={{ p: 3, mb: 3 }}>
      <form onSubmit={onBrandSubmit}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Marka Adı"
            name="name"
            value={brandForm.name}
            onChange={onBrandFormChange}
            required
            size="small"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="brand-image-upload"
            type="file"
            onChange={onBrandImageChange}
          />
          <label htmlFor="brand-image-upload">
            <Button
              variant="outlined"
              component="span"
              disabled={brandImageUploading}
              startIcon={<AddIcon />}
            >
              {brandImageUploading ? 'Yükleniyor...' : 'Resim Yükle'}
            </Button>
          </label>
        </Box>
        {brandForm.image && (
          <Box sx={{ mb: 2 }}>
            <img 
              src={brandForm.image} 
              alt="Marka resmi" 
              style={{ width: 100, height: 60, objectFit: 'contain', border: '1px solid #ddd', borderRadius: 4 }}
            />
          </Box>
        )}
        {brandError && <Alert severity="error" sx={{ mt: 2 }}>{brandError}</Alert>}
        {brandSuccess && <Alert severity="success" sx={{ mt: 2 }}>{brandSuccess}</Alert>}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={brandLoading}>
          {brandLoading ? 'Ekleniyor...' : 'Ekle'}
        </Button>
      </form>
    </Paper>

    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
      Kayıtlı Markalar
    </Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Marka Adı</TableCell>
            <TableCell>Resim</TableCell>
            <TableCell>Durum</TableCell>
            <TableCell>İşlem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {brandList.map((brand) => (
            <TableRow key={brand._id}>
              {editingBrandId === brand._id ? (
                <>
                  <TableCell>
                    <TextField
                      size="small"
                      value={editBrandForm.name}
                      onChange={(e) => onEditBrandFormChange({ target: { name: 'name', value: e.target.value } })}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id={`edit-brand-image-${brand._id}`}
                        type="file"
                        onChange={onEditBrandImageChange}
                      />
                      <label htmlFor={`edit-brand-image-${brand._id}`}>
                        <Button size="small" variant="outlined" component="span">
                          Değiştir
                        </Button>
                      </label>
                      {editBrandForm.image && (
                        <img 
                          src={editBrandForm.image} 
                          alt="Marka resmi" 
                          style={{ width: 60, height: 40, objectFit: 'contain' }}
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={editBrandForm.isActive}
                          onChange={(e) => onEditBrandFormChange({ target: { name: 'isActive', value: e.target.checked } })}
                        />
                      }
                      label={editBrandForm.isActive ? 'Aktif' : 'Pasif'}
                    />
                  </TableCell>
                  <TableCell>
                    <Button color="primary" onClick={onEditBrandSave} disabled={editBrandLoading}>
                      {editBrandLoading ? 'Kaydediliyor...' : 'Kaydet'}
                    </Button>
                    <Button color="secondary" onClick={onEditBrandCancel}>
                      İptal
                    </Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      {brand.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {brand.image && (
                      <img 
                        src={brand.image} 
                        alt={brand.name} 
                        style={{ width: 60, height: 40, objectFit: 'contain', borderRadius: 4 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={brand.isActive}
                          onChange={() => onToggleBrandStatus(brand._id, !brand.isActive)}
                        />
                      }
                      label={brand.isActive ? 'Aktif' : 'Pasif'}
                    />
                  </TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => onEditBrand(brand)}>
                      <EditIcon />
                    </Button>
                    <Button color="error" onClick={() => onDeleteBrand(brand._id)}>
                      <DeleteIcon />
                    </Button>
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

export default BrandPanel; 