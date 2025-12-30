import React from 'react';

const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-green-dark to-primary text-white py-3 text-center text-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-gradient"></div>
      <div className="relative z-10 flex items-center justify-center gap-4 flex-wrap px-4">
        <span className="animate-pulse">🎉</span>
        <p className="font-medium">
          <span className="font-bold text-gold">Free Shipping</span> on Orders Over PKR 50
        </p>
        <span className="hidden sm:inline">|</span>
        <p>
          Use Code: <span className="font-bold bg-gold/20 px-2 py-1 rounded">SHILAJIT20</span> for <span className="font-bold text-gold">20% Off</span>
        </p>
      </div>
    </div>
  );
};

export default AnnouncementBar;



