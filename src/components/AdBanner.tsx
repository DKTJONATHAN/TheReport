import React, { useEffect } from 'react';

interface AdBannerProps {
  zoneId: string;
  minHeight?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ zoneId, minHeight = '90px' }) => {
  useEffect(() => {
    const runAd = () => {
      if ((window as any).aclib) {
        (window as any).aclib.runBanner({
          zoneId: zoneId,
        });
      }
    };

    if (document.readyState === 'complete') {
      runAd();
    } else {
      window.addEventListener('load', runAd);
      return () => window.removeEventListener('load', runAd);
    }
  }, [zoneId]);

  return (
    <div 
      className="ad-container" 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        minHeight, 
        margin: '20px 0',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {/* AdCash will inject content here */}
    </div>
  );
};

export default AdBanner;
