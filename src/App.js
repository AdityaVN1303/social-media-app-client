import {Route , Routes} from 'react-router-dom' 
import Homepage from './components/Homepage'
import Login from './components/Login'
import Register from './components/Register'
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel'

import ProfilePage from './components/ProfilePage'
import NotificationPage from './components/NotificationPage';

function App() {
  return (
    <div className="App flex max-w-6xl mx-auto overflow-x-hidden">
      <Sidebar/>
     <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register/>}/>
      <Route path='/notifications' element={<NotificationPage/>}/>
      <Route path='/profile/:username' element={<ProfilePage/>}/>
     </Routes>
     <RightPanel/>
    </div>
  );
}

export default App;
