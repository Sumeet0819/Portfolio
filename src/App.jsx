import React, { useState, useEffect } from 'react';
import MainRoutes from './routes/MainRoutes';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      {isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <MainRoutes />
      )}
    </div>
  );
}
