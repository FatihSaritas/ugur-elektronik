import React from 'react';
import { Box, Typography, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';

const TelevisionPanel = ({
  tvList, tvForm, tvError, tvSuccess, tvLoading, imageUploading,
  editingTvId, editTvForm, editTvLoading,
  onTvFormChange, onTvSubmit, onImageChange,
  onEditTv, onEditTvFormChange, onEditTvImageChange, onEditTvSave, onEditTvCancel,
  onDeleteTv
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
          >
            {imageUploading ? 'Yükleniyor...' : 'Fotoğraf Seç'}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={onImageChange}
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
            <TableCell>Marka</TableCell>
            <TableCell>Özellikler</TableCell>
            <TableCell>Fiyat</TableCell>
            <TableCell>Resim</TableCell>
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
                      Fotoğraf Seç
                      <input type="file" accept="image/*" hidden onChange={onEditTvImageChange} />
                    </Button>
                    {editTvForm.image && <img src={editTvForm.image} alt="Ürün" style={{ width: 40, borderRadius: 4, marginLeft: 8 }} />}
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
                  <TableCell>{tv.image && <img src={tv.image} alt={tv.name} style={{ width: 60, borderRadius: 4 }} />}</TableCell>
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