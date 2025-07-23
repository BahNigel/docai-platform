import React from 'react';

const Header = ({ pageTitle = 'Dashboard' }) => {
  // Get username from localStorage or fallback
  const username = localStorage.getItem('username') || 'User';

  // Get initials from username
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
  };

  const initials = getInitials(username);

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="text-white text-uppercase mb-0">{pageTitle}</h2>
      <div className="d-flex gap-3 align-items-center">
        <div
          className="bg-secondary rounded-circle d-flex justify-content-center align-items-center text-white"
          style={{ width: '32px', height: '32px' }}
          title={username} // tooltip with full username
        >
          {initials}
        </div>
      </div>
    </div>
  );
};

export default Header;
