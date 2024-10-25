import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WebAppSDK from '@twa-dev/sdk';
import { BackButton } from '@twa-dev/sdk/react';
import '../styles/Gifts.css';
import { giftIconActive } from '../assets/menuImages/menuImgaesActive.tsx';
import { storeIcon, leaderboardIcon, profileIcon } from '../assets/menuImages/menuImagesNone.tsx';

declare global {
    interface Window {
        Telegram?: any;
    }
  }
  
  const Gifts = () => {
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
                    {storeIcon}
                    <span className="label">Store</span>
                  </div>
                    <div className="button" onClick={handleGiftsClick}>
                      {giftIconActive}
                      <span id="activeIcon" className="label">Gifts</span>
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
  
                <BackButton />
                  
              </div>
          )}
      </>
    );
  
  };
  
  export default Gifts;