import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SmoothScroll } from './lib/SmoothScroll';
import SiteLayout from './layouts/SiteLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import Project from './pages/Project';
import Process from './pages/Process';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:slug" element={<Project />} />
            <Route path="process" element={<Process />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
}
