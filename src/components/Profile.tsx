import { useState, useEffect } from 'react';
import WebAppSDK from '@twa-dev/sdk';
import { premiumIcon } from '../assets/profileImages/premiumIcon';
import { clocksIcon } from '../assets/profileImages/clocksIcon';
import '../styles/Profile.css';
import { useNavigate } from 'react-router-dom';
import { giftIcon, leaderboardIcon, storeIcon } from '../assets/menuImages/menuImagesNone';
import { profileIconActive } from '../assets/menuImages/menuImgaesActive';

export interface WebAppUser {
    id: number;
    first_name: string;
    photo_url?: string;
    is_premium?: boolean;
}

const Profile = () => {
    const [user, setUser] = useState<WebAppUser | null>(null);
    const [isTg, setIsTg] = useState(false);
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
        setIsTg(isTgCheck);

        if (isTgCheck) {
            WebAppSDK.ready();

            const initData = WebAppSDK.initDataUnsafe?.user;
            if (initData) {
                const userData: WebAppUser = {
                    id: initData.id,
                    first_name: initData.first_name,
                    photo_url: initData.photo_url,
                    is_premium: initData.is_premium,
                };
                setUser(userData);
            }
        }
    }, []);

    const getUpdatedPhotoUrl = (): string | undefined => {
        return user?.photo_url ? `${user.photo_url}?random=${Math.random()}` : undefined;
    };

    const generatePlaceholderStyle = (): React.CSSProperties => {
      const colors = [
        ['#FF5733', '#FF8D1A'],
        ['#33FF57', '#57FF8D'],
        ['#3357FF', '#5733FF'],
        ['#FF33A1', '#FF5733'],
        ['#33FFF5', '#33A1FF'],
        ['#FF33F5', '#FF5733'],
        ['#FFD700', '#FFA500'], 
        ['#FF69B4', '#FF1493'], 
        ['#4B0082', '#9400D3'], 
        ['#FF4500', '#FF6347'], 
        ['#00CED1', '#20B2AA'], 
        ['#2E8B57', '#3CB371'], 
        ['#8A2BE2', '#9932CC'], 
        ['#DC143C', '#FF4500'], 
        ['#7B68EE', '#6A5ACD']  
        ];
    
        const randomColors = colors[Math.floor(Math.random() * colors.length)];
        return {
            background: `linear-gradient(135deg, ${randomColors[0]}, ${randomColors[1]})`,
            color: '#FFF',
            fontSize: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            width: '85px',
            height: '85px',
            fontWeight: 'bold',
        };
    };

    return (
        <>
            {!isTg ? (
                <div className="denied-container">
                    <p>Access Denied: Please open this in Telegram.</p>
                </div>
            ) : (
                <div className="tg-container">
                  <div className="bottom-menu">
                        <div className="button" onClick={handleBackClick}>
                            {storeIcon}
                            <span className="label">Store</span>
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
                            {profileIconActive}
                            <span id="activeIcon" className="label">Profile</span>
                        </div>
                    </div>
                    <div className="profile-container">
                        <div className="profile-header">
                            <button className="toggle-theme">🌞</button>
                            <div className="language-switch">
                                <button className="active">EN</button>
                                <button>RU</button>
                            </div>
                        </div>
                        <div className="profile-info">
                            {getUpdatedPhotoUrl() ? (
                                <img src={getUpdatedPhotoUrl()} alt="User Avatar" className="user-avatar" />
                            ) : (
                                <div className="placeholder-avatar" style={generatePlaceholderStyle()}>
                                    {user?.first_name ? user.first_name[0].toUpperCase() : 'U'}
                                </div>
                            )}
                            <p className="user-id">#160</p>
                            <p className="user-name">
                                {user?.first_name}
                                {user?.is_premium && <span className="premium-icon">{premiumIcon}</span>}
                            </p>
                            <p className="user-gifts">128 gifts received</p>
                            <div className="recent-actions">
                                <span className="clock-icon">{clocksIcon}</span> Recent Actions › 
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
