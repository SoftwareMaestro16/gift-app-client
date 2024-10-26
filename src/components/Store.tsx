import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WebAppSDK from '@twa-dev/sdk';
import '../styles/Store.css';
import { storeIconActive } from '../assets/menuImages/menuImgaesActive.tsx';
import { giftIcon, leaderboardIcon, profileIcon } from '../assets/menuImages/menuImagesNone.tsx';
import { mainStoreIcon } from '../assets/storeImages/mainStoreIcon.tsx';
import { cakeIcon, greenIcon, blueIcon, redIcon } from '../assets/giftBackgrounds/giftBackgroundsStore.tsx';

declare global {
    interface Window {
        Telegram?: any;
    }
  }
  
  const Store = () => {
    const [isTg, setIsTg] = useState<boolean>(false);
    const navigate = useNavigate();
  
    const handleBackClick = () => {
      navigate('/');
    };
  
    const handleGiftsClick = () => {
      navigate('/gifts'); 
    };
  
    const handleLeaderboardClick = () => {
      navigate('/leaderboard'); 
    };
  
    const handleProfileClick = () => {
      navigate('/profile'); 
    };
  
    useEffect(() => {
      const isTgCheck = Boolean(window.Telegram?.WebApp?.initData);
  
      if (isTgCheck) {
          WebAppSDK.ready();
          WebAppSDK.enableClosingConfirmation();
          WebAppSDK.expand();
          WebAppSDK.headerColor = "#ffffff";
          setIsTg(true);
  
          document.body.style.backgroundColor = 'var(--tg-theme-bg-color)';
          document.body.style.setProperty('background-color', '#ffffff', 'important');
      }
    }, []);
  
    return (
      <>
          {!isTg ? (
              <div className="denied-container">
              </div>
          ) : (
              <div className="tg-container">
                  <div className="bottom-menu">
                    <div className="button" onClick={handleBackClick}>
                    {storeIconActive}
                    <span id="activeIcon" className="label">Store</span>
                  </div>
                    <div className="button" onClick={handleGiftsClick}>
                      {giftIcon}
                      <span className="label">Gifts</span>
                    </div>
                    <div className="button" onClick={handleLeaderboardClick}>
                      {leaderboardIcon}
                      <span className="label">Leaderboard</span>
                    </div>
                    <div className="button" onClick={handleProfileClick}>
                      {profileIcon}
                      <span className="label">Profile</span>
                    </div>
                  </div>

                  <div className="main-store-info">
                    {mainStoreIcon}
                    <h2>Buy and Send Gifts</h2>
                    <h3>Unique gifts for everyone by Crypto Pay.</h3>
                  </div>

                  <div className="gifts-grid">
                    <div className="gift-item">
                      <div className="gift-background">
                      <div className="cake-icon">
                        {cakeIcon}
                    </div>
                          <br />
                        <span className='quantity-gifts'>3 of 500</span>
                        <h4>Delicious Cake</h4>
                        <button>10 USDT</button>
                      </div>
                    </div>

                    <div className="gift-item">
                      <div className="gift-background">
                      <div className="cake-icon">
                        {greenIcon}
                    </div>
                    <br />
                        <span className='quantity-gifts'>802 of 3K</span>
                        <h4>Green Star</h4>
                        <button>5 TON</button>
                      </div>
                    </div>

                    <div className="gift-item">
                      <div className="gift-background">
                      <div className="cake-icon">
                        {blueIcon}
                    </div>
                    <br />
                        <span className='quantity-gifts'>174 of 246</span>
                        <h4>Blue Star</h4>
                        <button>10 TON</button>
                      </div>
                    </div>

                    <div className="gift-item">
                      <div className="gift-background">
                      <div className="cake-icon">
                        {redIcon}
                    </div>
                    <br />
                        <span className='quantity-gifts'>10K of 10K</span>
                        <h4>Red Star</h4>
                        <button>15 TON</button>
                      </div>
                    </div>
                  </div>

              <br />
              <br />



              </div>
          )}
      </>
    );
  
  };
  
  export default Store;