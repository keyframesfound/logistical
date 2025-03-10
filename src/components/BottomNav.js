import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCode, FiCamera, FiList } from 'react-icons/fi';

function BottomNav() {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: <FiCode size={24} />, label: 'Create' },
    { path: '/scan', icon: <FiCamera size={24} />, label: 'Scan' },
    { path: '/inventory', icon: <FiList size={24} />, label: 'Inventory' }
  ];

  return (
    <nav style={styles.nav}>
      {navItems.map(item => (
        <Link key={item.path} to={item.path} style={styles.link}>
          <div style={{ color: location.pathname === item.path ? '#000' : '#888' }}>
            {item.icon}
            <div style={styles.label}>{item.label}</div>
          </div>
        </Link>
      ))}
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: '#f7f7f7',
    borderTop: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  link: {
    textDecoration: 'none',
    textAlign: 'center'
  },
  label: {
    fontSize: '12px',
    marginTop: '4px'
  }
};

export default BottomNav;
