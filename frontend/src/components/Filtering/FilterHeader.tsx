import { Button, Drawer, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { theme } from '../../theme/theme';
// import { SelectArtillery } from '../FilteringCheckbox/SelectCity';
import { FilterHeaderProps } from './FilterHeader.model';

export const FilterHeader = ({ onClose, isOpen }: FilterHeaderProps) : JSX.Element=> {
  return (
    <Drawer anchor="right" open={isOpen}>
      <Stack p={3} rowGap={2}>
        <Stack width="320px" rowGap={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography component="span" variant="h6">
              Filters
            </Typography>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={onClose} />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Button variant="text" sx={{ color: theme.palette.info.main, pl: 0 }}>
            Clear all
          </Button>
          <button className="neon-button">Search</button>
        </Stack>
        {/* <SelectArtillery /> */}
      </Stack>
    </Drawer>
  );
};
