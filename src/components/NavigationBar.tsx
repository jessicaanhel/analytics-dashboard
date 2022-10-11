import { Box, List, ListItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../theme/theme';

const NavigationBar = () : JSX.Element => {
  const pageLinks = [
    { label: 'React', path: '/' },
    { label: 'Home', path: '/home' },
  ];
  const location = useLocation();

  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 2,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
      <List style={{ display: 'flex', flexDirection: 'row', padding: 35 }}>
        {pageLinks.map((link) => (
          <ListItem
            key={link.path}
            component={Link}
            to={link.path}
            sx={{ color: location.pathname === link.path ? theme.palette.secondary.main : 'black' }}
          >
            {link.label}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NavigationBar;