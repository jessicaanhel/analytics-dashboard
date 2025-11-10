import styled from '@emotion/styled';
import { InfoPanelProps } from './InfoPanel.model';

const Panel = styled.div<{ colorKey: InfoPanelProps['color'] }>`
  border: 2px solid ${({ colorKey, theme }) => theme.palette[colorKey].main};
  color: ${({ colorKey, theme }) => theme.palette[colorKey].main};
  box-shadow: ${({ colorKey, theme }) => theme.palette.glow[colorKey]};
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  background-color: transparent;

  &:hover {
    box-shadow: ${({ colorKey, theme }) =>
      theme.palette.glow[colorKey].replace(/10px/g, '15px')};
    transform: translateY(-2px);
  }
`;

export const InfoPanel: React.FC<InfoPanelProps> = ({ title, value, color }) => {
  return (
    <Panel colorKey={color}>
      <div style={{ fontSize: '0.9rem' }}>{title}</div>
      <div style={{ fontSize: '1.3rem', marginTop: 4 }}>{value}</div>
    </Panel>
  );
};

export default InfoPanel;