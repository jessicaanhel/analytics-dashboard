export const layoutStyles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Roboto, sans-serif',
  } as React.CSSProperties,

  main: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0d0d0d',
    overflowY: 'auto',
    marginLeft: 60,
  } as React.CSSProperties,

  sidebar: {
    width: 220,
    backgroundColor: '#111111',
    color: '#ffffff',
    padding: 16,
    boxSizing: 'border-box',
    overflowY: 'auto',
  } as React.CSSProperties,

  tab: {
    padding: 8,
    cursor: 'pointer',
    borderRadius: 4,
    marginTop: 4,
  } as React.CSSProperties,

  activeTab: {
    padding: 8,
    cursor: 'pointer',
    borderRadius: 4,
    marginTop: 4,
    backgroundColor: '#222222',
  } as React.CSSProperties,
};
