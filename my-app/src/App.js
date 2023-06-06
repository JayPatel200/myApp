import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin/Admin';
import Missing from './components/Missing/Missing';
import Unauthorized from './components/Unauthorized/Unauthorized';
import LinkPage from './components/Linkspage/LinkPage';
import Schedule from './components/Schedule/Schedule';
import Chatbox from './components/Chatbox/Chatbox';
import Profile from './components/Profile/Profile';
import RegisterOwnner from './components/RegisterOwner/RegisterOwner';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="registerowner" element={<RegisterOwnner />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="schedule" element={<Schedule />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="chatbox" element={<Chatbox />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[1984]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[5150]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        {/* <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route> */}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;