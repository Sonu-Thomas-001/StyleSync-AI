import React, { useState } from 'react';
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { Journal } from './pages/Journal';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
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
      case 'Journal':
        return <Journal />;
      case 'About':
        return <About />;
      case 'Privacy':
        return <Privacy />;
      case 'Terms':
        return <Terms />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-900 mesh-gradient selection:bg-stone-200">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <main className="flex-grow flex flex-col pt-20">
        {renderPage()}
      </main>

      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;