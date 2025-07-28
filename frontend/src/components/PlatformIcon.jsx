import React from 'react';

function PlatformIcon({ platform }) {
  const logos = {
    amazon: "🛒",
    blinkit: "⚡",
    website: "🌐"
  };
  return <span>{logos[platform?.toLowerCase()] || "📦"}</span>;
}

export default PlatformIcon; 