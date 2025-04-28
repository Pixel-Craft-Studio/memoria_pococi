import { useState, useEffect, useRef } from 'react';
import { useGetAll } from '../../../hooks/useBaseEndpointQueries';
import { ENDPOINTS } from '../../../api/api_constants';

const CategorySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  
  const [allCategories, setAllCategories] = useState([])

  const {
    data: allResponseData,
  } = useGetAll(ENDPOINTS.TIMELINE_CATEGORY);

  useEffect(() => {
    if (allResponseData) {
      const categories = allResponseData.data;
      setAllCategories(categories);
    }
  }, [allResponseData]);

  // Categorías filtradas según la búsqueda y exclusión de seleccionadas
  const filteredCategories = allCategories
    .filter(category => !selectedCategories.includes(category))
    .filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Cierra el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategories([...selectedCategories, category]);
    setSearchTerm('');
    setIsOpen(false);
    
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setSelectedCategories(
      selectedCategories.filter(category => category.id !== categoryToRemove.id)
    );
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg ">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Categorías
      </label>
      
      {/* Input de búsqueda con dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div className="flex rounded-md shadow-sm">
          <input
            ref={inputRef}
            type="text"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 bg-white border"
            placeholder="Buscar categorías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={handleInputClick}
          />
         
        </div>

              {/* Categorías seleccionadas */}
      <div className="flex flex-wrap gap-2 mt-3">
        {selectedCategories.map(category => (
          <span 
            key={category.id} 
            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800"
          >
            {category.name}
            <button
              type="button"
              className="ml-1.5 inline-flex text-indigo-500 hover:text-indigo-800 focus:outline-none"
              onClick={() => handleRemoveCategory(category)}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </span>
        ))}
      </div>
        
        {isOpen && (
          <ul className="absolute z-10  w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <li
                  key={category.id}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100 text-gray-900"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
                </li>
              ))
            ) : (
              <li key={"none"} className="text-gray-500 select-none relative py-2 pl-3 pr-9">
                No se encontraron categorías
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;