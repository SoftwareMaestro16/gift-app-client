import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WebAppSDK from '@twa-dev/sdk';
import '../styles/Store.css';
import { storeIconActive } from '../assets/menuImages/menuImgaesActive.tsx';
import { giftIcon, leaderboardIcon, profileIcon } from '../assets/menuImages/menuImagesNone.tsx';
import { mainStoreIcon } from '../assets/storeImages/mainStoreIcon.tsx';

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

              </div>
          )}
      </>
    );
  
  };
  
  export default Store;