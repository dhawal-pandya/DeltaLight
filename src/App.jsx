import { useState } from 'react';
import { distanceUnits, calculateLightTime } from './lightTimeAlgo';
import { validateInput } from './validation';
import Starfield from './Starfield';

function App() {
  const [distance, setDistance] = useState('');
  const [unitFactor, setUnitFactor] = useState(distanceUnits.find(u => u.symbol === 'km').factor);
  const [result, setResult] = useState(null); // { value, unit }
  const [error, setError] = useState('');

  const handleCalculate = () => {
    const errorMessage = validateInput(distance);
    if (errorMessage) {
      setError(errorMessage);
      setResult(null);
      return;
    }

    setError('');
    const calculatedResult = calculateLightTime(Number(distance), unitFactor);
    if (calculatedResult.error) {
      setError(calculatedResult.error);
      setResult(null);
    } else {
      setResult(calculatedResult);
    }
  };

  const handleInputChange = (e) => {
    setDistance(e.target.value);
    if (error) setError('');
    if (result) setResult(null);
  };

  const formatResult = (res) => {
    if (!res) return '';
    if (res.value === 0) return '0 Light Seconds';

    let displayValue;
    if (res.value > 0 && res.value < 0.01) {
      displayValue = res.value.toExponential(2);
    } else {
      const fixedValue = res.value.toFixed(2);
      displayValue = fixedValue.endsWith('.00') ? Math.floor(res.value) : fixedValue;
    }

    return `${displayValue} ${res.unit}`;
  };

  return (
    <>
      <Starfield />
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen p-4 text-center">
        <header>
          <h1 className="text-5xl tracking-wider">DeltaLight</h1>
        </header>

        <main className="flex flex-col items-center gap-4 w-full max-w-md">
          <div className="w-full">
            <label htmlFor="distance" className="sr-only">Distance</label>
            <input
              id="distance"
              type="text"
              value={distance}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
              placeholder="Enter distance"
              className="w-full px-4 py-3 text-lg text-center bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="w-full">
            <label htmlFor="unit" className="sr-only">Unit</label>
            <select
              id="unit"
              value={unitFactor}
              onChange={(e) => setUnitFactor(Number(e.target.value))}
              className="w-full px-4 py-3 text-lg text-center bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {distanceUnits.map((unit) => (
                <option key={unit.symbol} value={unit.factor}>
                  {unit.name} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>
          <button 
            onClick={handleCalculate}
            className="w-full px-4 py-3 text-lg font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            Calculate
          </button>
          <div className="mt-6 text-2xl font-bold text-green-400 min-h-[32px]">
            {formatResult(result)}
          </div>
          <div className="mt-2 text-lg text-red-500 min-h-[28px]">
            {error}
          </div>
        </main>

        <footer className="text-gray-500">
          Made with <span className="text-red-500">&hearts;</span> by <a href="https://github.com/dhawal-pandya" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Dhawal</a>
        </footer>
      </div>
    </>
  );
}

export default App;