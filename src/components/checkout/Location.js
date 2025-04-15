import { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';

function LocationSelector() {
  // Only India's data
  const [countries] = useState([Country.getCountryByCode('IN')]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Set India as the default selected country
  const [selectedCountry, setSelectedCountry] = useState(Country.getCountryByCode('IN'));
  const [selectedState, setSelectedState] = useState(null);

  // Load India's states on component mount
  useEffect(() => {
    if (selectedCountry) {
      setStates(State.getStatesOfCountry(selectedCountry.isoCode));
    }
  }, [selectedCountry]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setStates(State.getStatesOfCountry(country.isoCode));
    setCities([]);
    setSelectedState(null); // Reset state selection
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode));
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <select
            className='form-select'
            onChange={(e) =>
              handleCountryChange(
                countries.find((c) => c.isoCode === e.target.value)
              )
            }
            value={selectedCountry ? selectedCountry.isoCode : ''}
          >
            <option value=''>Select Country</option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className='col'>
          <select
            disabled={!selectedCountry}
            className='form-select'
            onChange={(e) =>
              handleStateChange(states.find((s) => s.isoCode === e.target.value))
            }
            value={selectedState ? selectedState.isoCode : ''}
          >
            <option value=''>Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className='col'>
          <select
            disabled={!selectedState}
            className='form-select'
            value={selectedState ? selectedState.isoCode : ''}
          >
            <option value=''>Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default LocationSelector;