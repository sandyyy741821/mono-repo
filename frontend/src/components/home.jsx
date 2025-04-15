import React from 'react';
import './home.css'

const LandingPage = () => {
    const handleRedirect = (url) => {
      window.location.href = url;
    };
  
    return (
      <div className="main-container">
        <h1 className="text-4xl font-bold mb-8">Welcome to Example.com</h1>
        <div className="flex flex-col space-y-6">
          <button
            onClick={() => handleRedirect("https://sub.mono-repo-cu9.pages.dev")}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to App
          </button>
          <button
            onClick={() => handleRedirect("https://mono-repo-cu9.pages.dev/blog")}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Go to Blog
          </button>
        </div>
      </div>

    );
  };
  
  export default LandingPage;