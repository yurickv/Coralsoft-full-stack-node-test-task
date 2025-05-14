import { useState } from 'react';

interface RecipesViewProps {
  categories: string[];
  areas: string[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedArea: string;
  setSelectedArea: (value: string) => void;
  handleReset: () => void;
}

export function RecipesFilters({
  categories,
  areas,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedArea,
  setSelectedArea,
  handleReset,
}: RecipesViewProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = () => {
    setSearchQuery(localSearch.trim());
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleSearchSubmit}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
        >
          Search
        </button>
        <button
          onClick={() => {
            handleReset();
            setLocalSearch('');
          }}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg"
        >
          Reset
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={selectedArea}
          onChange={(e) => {
            setSelectedArea(e.target.value);
          }}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Areas</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
