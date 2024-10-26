import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WebAppSDK from '@twa-dev/sdk';
import { BackButton } from '@twa-dev/sdk/react';
import '../styles/Profile.css';
import { profileIconActive } from '../assets/menuImages/menuImgaesActive.tsx';
import { storeIcon, giftIcon, leaderboardIcon } from '../assets/menuImages/menuImagesNone.tsx';

// Интерфейс для данных пользователя
export interface WebAppUser {
    id: number;
    is_bot?: boolean;
    first_name: string;
    photo_url?: string;
    is_premium?: boolean;
}

declare global {
    interface Window {
        Telegram?: any;
    }
}

const Profile = () => {
    const [isTg, setIsTg] = useState<boolean>(false);
    const [user, setUser] = useState<WebAppUser | null>(null);
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

            // Получение данных пользователя
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

            document.body.style.backgroundColor = 'var(--tg-theme-bg-color)';
            document.body.style.setProperty('background-color', '#ffffff', 'important');
        }
    }, []);

    return (
        <>
            {!isTg ? (
                <div className="denied-container">
                    <p>Telegram доступ недоступен</p>
                </div>
            ) : (
                <div className="tg-container">
                    <div className="user-profile">
                        {user?.photo_url ? (
                            <img src={user.photo_url} alt="User Avatar" className="user-avatar" />
                        ) : (
                            <div className="placeholder-avatar">Нет фото</div>
                        )}
                        <div className="user-info">
                            <span className="user-name">
                                {user?.first_name}
                                {user?.is_premium && <span className="premium-star">★</span>}
                            </span>
                        </div>
                    </div>
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
                    <BackButton />
                </div>
            )}
        </>
    );
};

export default Profile;
