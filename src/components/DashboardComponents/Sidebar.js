import React from 'react';
import { Drawer, Toolbar, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

const Sidebar = ({ categories, selectedCategory, onSelectCategory, onNavigateHome }) => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#fff' },
    }}
  >
    <Toolbar />
    <Box sx={{ textAlign: 'center', py: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>
        Admin Paneli
      </Typography>
    </Box>
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <ListItem button onClick={onNavigateHome}>
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Anasayfa" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {categories.map((cat, idx) => (
          <ListItem
            button
            key={cat.name}
            selected={selectedCategory === cat.name}
            onClick={() => onSelectCategory(cat.name)}
          >
            <ListItemIcon>{cat.icon}</ListItemIcon>
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  </Drawer>
);

export default Sidebar; 