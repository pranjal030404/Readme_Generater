import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Generator from './pages/Generator';
import Templates from './pages/Templates';
import Preview from './pages/Preview';
import AuthCallback from './pages/AuthCallback';
import NotFound from './pages/NotFound';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#fff',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="generator" element={<Generator />} />
            <Route path="templates" element={<Templates />} />
            <Route path="preview/:shareId" element={<Preview />} />
            <Route path="auth/callback" element={<AuthCallback />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
