// CountryDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CountryDetail.css'; // Import your CSS file

function CountryDetail() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .then(response => {
        setCountry(response.data[0]);
      })
      .catch(error => {
        console.error('Error fetching country data', error);
        setError('Country data could not be fetched.');
      });
  }, [countryCode]);

  if (error) return <div>{error}</div>;
  if (!country) return <div>Loading...</div>;

  return (
    <div className="country-detail">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <div className="detail-container">
        <div className="flag-container">
          <img src={country.flags.svg} alt={`${country.name.common} flag`} className="country-flag" />
        </div>
        <div className="info-container">
          <h1>{country.name.common}</h1>
          <p><strong>Capital:</strong> {country.capital}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Subregion:</strong> {country.subregion}</p>
          <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
          <p><strong>Currencies:</strong> {Object.values(country.currencies).map(currency => currency.name).join(', ')}</p>
          <p><strong>Bordering Countries:</strong> 
            {country.borders ? country.borders.join(', ') : ' None'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;
