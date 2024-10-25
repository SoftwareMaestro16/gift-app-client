import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Store from './Store';
import Gifts from './Gifts';
import Leaderboard from './Leaderboard';
import Profile from './Profile';

function App() {
  
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Store />} />
                <Route path="/gifts" element={<Gifts />} /> 
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
        
    );
}

export default App;

