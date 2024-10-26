// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ countries, search, setSearch, region, setRegion }) {
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase()) &&
    (region === '' || country.region === region)
  );

  return (
    <div>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <ul className="country-list">
        {filteredCountries.map(country => (
          <li key={country.cca3} className="country-item">
            <Link to={`/country/${country.cca3}`}>
              <img src={country.flags.svg} alt={`${country.name.common} flag`} />
              <h2>{country.name.common}</h2>             
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Capital:</strong> {country.capital ? country.capital : 'N/A'}</p> {/* Handles cases where capital might be missing */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
