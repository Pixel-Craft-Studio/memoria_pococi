import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useGetAll } from '../../../hooks/useBaseEndpointQueries';
import { ENDPOINTS } from '../../../api/api_constants';

const YearDateSelector = ({selectedYear, setSelectedYear}) => {
 
  const [dateValue, setDateValue] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false);
  const [yearSearchTerm, setYearSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const [availableYears, setAvailableYears] = useState([])

  const {
    data: allResponseData,
  } = useGetAll(ENDPOINTS.TIMELINE_YEAR);

  useEffect(() => {
    if (allResponseData) {
      const years = allResponseData.data.map((item) => item.year);
      setAvailableYears(years);
    }
  }, [allResponseData]);

  const filteredYears = yearSearchTerm
    ? availableYears.filter(year => 
        year.toString().includes(yearSearchTerm)
      )
    : availableYears;

  useEffect(() => {
    const min = `${selectedYear}-01-01`;
    const max = `${selectedYear}-12-31`;
    setMinDate(min);
    setMaxDate(max);

    // Limpiar fecha si está fuera del nuevo rango
    if (dateValue && (dateValue < min || dateValue > max)) {
      setDateValue('');
    }
  }, [selectedYear]);

  // Cierra el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsYearSelectOpen(false);
        // Limpiar término de búsqueda al cerrar
        setYearSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setIsYearSelectOpen(false);
    setYearSearchTerm('');
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg ">
      <div className="space-y-6">
        {/* Selector de año con búsqueda */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
          <div className="relative">
            <button
              type="button"
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onClick={() => setIsYearSelectOpen(!isYearSelectOpen)}
            >
              <span className="block truncate">{selectedYear || "Selecciona un año"}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            
            {isYearSelectOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60">
                {/* Campo de búsqueda dentro del dropdown */}
                <div className="sticky top-0 z-10 bg-white p-2 border-b">
                  <input
                    type="text"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-1.5 text-sm"
                    placeholder="Buscar año..."
                    value={yearSearchTerm}
                    onChange={(e) => setYearSearchTerm(e.target.value)}
                    autoFocus
                  />
                </div>
                
                <ul className="py-1">
                  {filteredYears.length > 0 ? (
                    filteredYears.map((year) => (
                      <li
                        key={year}
                        className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100 ${
                          year === selectedYear ? 'bg-indigo-50 text-indigo-700' : 'text-gray-900'
                        }`}
                        onClick={() => handleYearChange(year)}
                      >
                        {year}
                        {year === selectedYear && (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="py-2 pl-3 pr-9 text-gray-500">No se encontraron resultados</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Selector de fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
          <input
            type="date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
            min={minDate}
            max={maxDate}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 bg-white border"
          />
        </div>
      </div>
    </div>
  );
};
YearDateSelector.propTypes = {
  selectedYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setSelectedYear: PropTypes.func.isRequired,
};

export default YearDateSelector;