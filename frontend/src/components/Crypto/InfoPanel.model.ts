import type { ThemeColorKey } from '../../theme/theme.model';

export interface InfoPanelProps {
  title: string;
  value: string | number;
  color: ThemeColorKey;
}
