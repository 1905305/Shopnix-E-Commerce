import React from 'react';

const ThemeToggle = () => {
  const toggleTheme = () => {
    document.body.classList.toggle('dark');
  };

  return (
    <button onClick={toggleTheme} style={{ marginLeft: '10px' }}>
      Toggle Dark Mode
    </button>
  );
};

export default ThemeToggle;
