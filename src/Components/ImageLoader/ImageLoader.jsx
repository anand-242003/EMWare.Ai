import { useState } from 'react';
import './ImageLoader.css';

const ImageLoader = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`image-loader-wrapper ${className || ''}`}>
      {!loaded && !error && (
        <div className="image-skeleton">
          <div className="skeleton-shimmer"></div>
        </div>
      )}
      {error && (
        <div className="image-error">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Image unavailable</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${loaded ? 'loaded' : 'loading'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{ display: error ? 'none' : 'block' }}
      />
    </div>
  );
};

export default ImageLoader;
