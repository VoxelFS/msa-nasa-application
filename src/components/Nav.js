import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { mainNavBarItems } from './NavBarComponents/NavConsts';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from './Auth';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Nav() {
    const drawerWidth = 240
    const navigate = useNavigate();

    const auth = useAuth();

    return (
        <>
        <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#1C375A'}}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            NASA Application
          </Typography>
        </Toolbar>
      </AppBar>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: '#101F33',
                color: 'rgba(255, 255, 255, 0.7)'
            },
            }}
            variant="permanent"
            anchor="left"
        >   
            <Toolbar />
        <Typography variant="h6" component="h6" sx={{ alignSelf: 'center', color: 'rgba(255, 255, 255, 0.7)' }}> 
            Overview
        </Typography>
        <Divider sx={{color: 'rgba(255, 255, 255, 0.7)' }}/>
        <List>
            {mainNavBarItems.map((text, index) => (
            <ListItem 
                button
                key={text.id} 
                disablePadding
                onClick={() => navigate(text.route)}
            >
              <ListItemButton>
                <ListItemIcon sx={{
                    color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.label} />
              </ListItemButton>
            </ListItem>
            ))}
        </List>
        <Divider />
        {
         auth.user && (<List>
          {['Account'].map((text) => (
            <ListItem
                button 
                key={text} 
                disablePadding
                onClick={() => navigate('/account')}
              >
              <ListItemButton>
                <ListItemIcon sx={{
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        
        </List>
        )}
        {
         auth.user && (<List>
          {['Log Out'].map((text) => (
            <ListItem
                button 
                key={text} 
                disablePadding
                onClick={() => auth.logout()}
              >
              <ListItemButton>
                <ListItemIcon sx={{
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        
        </List>
        )}
        {
          !auth.user && (
            <List>
              {['Sign Up'].map((text) => (
                <ListItem
                    button 
                    key={text} 
                    disablePadding
                    onClick={() => navigate('/subscribe')}
                  >
                  <ListItemButton>
                    <ListItemIcon sx={{
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )
        }
        </Drawer>
        
        </>
    );
}