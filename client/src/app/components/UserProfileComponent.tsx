"use client";

import Image from 'next/image';

const UserProfileComponent = () => {
  return (
    <div className="d-flex align-items-center">
      <div 
        className="position-relative bg-light rounded-circle" 
        style={{ 
          width: '40px', 
          height: '40px',
          overflow: 'hidden'
        }}
      >
        <Image
          src="/placeholder-user.png"
          alt="Profile placeholder"
          width={40}
          height={40}
          style={{ objectFit: 'cover' }}
          priority
          onError={(e) => {
            console.error('Error loading image:', e);
          }}
        />
      </div>
      <span className="ms-2 text-light">Hello, User</span>
    </div>
  );
};

export default UserProfileComponent; 