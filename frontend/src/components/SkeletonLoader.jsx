// components/SkeletonLoader.jsx
import React from 'react';

// You can add this CSS to your app.css or keep it inline here for simplicity
// For better project structure, add to app.css
/*
@keyframes pulse {
  0% {
    background-color: rgba(165, 165, 165, 0.1);
  }
  50% {
    background-color: rgba(165, 165, 165, 0.3);
  }
  100% {
    background-color: rgba(165, 165, 165, 0.1);
  }
}

.skeleton-pulse {
  animation: pulse 1.5s infinite ease-in-out;
}
*/

const SkeletonLoader = ({ width, height, borderRadius = '4px', className = '' }) => {
  return (
    <div
      className={`skeleton-pulse ${className}`}
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
        // Using inline styles for simplicity here, but external CSS is better for animations
        animation: 'pulse 1.5s infinite ease-in-out',
        backgroundColor: 'rgba(165, 165, 165, 0.1)' // Initial light grey
      }}
    ></div>
  );
};

// Also add the keyframes to your app.css for global use
// If you don't use app.css, you'd need to style this directly in a <style> tag or a CSS-in-JS solution.

export default SkeletonLoader;