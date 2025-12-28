import React, { useState } from 'react';
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { Inspiration } from './pages/Inspiration';
import { Profile } from './pages/Profile';
import { Journal } from './pages/Journal';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Retail } from './pages/Retail';
import { BrandHub } from './pages/BrandHub';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home />;
      case 'Collection':
        return <Collection />;
      case 'Inspiration':
        return <Inspiration />;
      case 'Profile':
        return <Profile />;
      case 'Journal':
        return <Journal />;
      case 'About':
        return <About />;
      case 'Privacy':
        return <Privacy />;
      case 'Terms':
        return <Terms />;
      case 'Retail':
        return <Retail />;
      case 'BrandHub':
        return <BrandHub />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-900 mesh-gradient selection:bg-stone-200">
      {/* Conditionally hide Header for Retail Mode to keep it immersive */}
      {currentPage !== 'Retail' && (
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      )}
      
      {/* Adjust padding for Retail mode */}
      <main className={`flex-grow flex flex-col ${currentPage !== 'Retail' ? 'pt-20' : ''}`}>
        {renderPage()}
      </main>

      {/* Conditionally hide standard Footer for Retail Mode */}
      {currentPage !== 'Retail' && (
         <Footer onNavigate={setCurrentPage} />
      )}
    </div>
  );
};

export default App;