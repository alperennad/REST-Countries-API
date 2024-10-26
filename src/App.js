import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryDetail from './CountryDetail';
import Home from './Home';
import Header from './Header'; // Import Header
import './App.css';
import './Home.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [theme, setTheme] = useState('light'); // Tema durumu

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from API', error);
      });
  }, []);

  // Tema değiştiğinde body'e ilgili sınıfı ekle
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Tema değiştirme fonksiyonu
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      {/* Include the Header here */}
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={
          <Home 
            countries={countries} 
            search={search} 
            setSearch={setSearch} 
            region={region} 
            setRegion={setRegion} 
          />
        } />
        
        {/* Country Detail Page */}
        <Route path="/country/:countryCode" element={<CountryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
