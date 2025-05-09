'use client';

import { useEffect, useState } from 'react';
import { getCategories, getAreas } from '../lib/api';
interface Category {
  category: string;
}

interface Area {
  name: string;
}

interface RecipeSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: { category: string; area: string }) => void;
}

export function RecipeSearch({ onSearch, onFilterChange }: RecipeSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, areasResponse] = await Promise.all([
          getCategories(),
          getAreas()
        ]);

        const categoriesData: any = categoriesResponse;
        const areasData: any = areasResponse;

        setCategories(categoriesData);
        setAreas(areasData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery])
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    onFilterChange({ category: newCategory, area });
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newArea = e.target.value;
    setArea(newArea);
    onFilterChange({ category, area: newArea });
  };

  const handleReset = () => {
    setIsLoading(true)
    setSearchQuery('');
    setArea('');
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSearch}
          className="btn btn-primary"
        >
          Search
        </button>
      </div>
      <div className="flex gap-4 flex-wrap">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={!isLoading}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.category} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>
        <select
          value={area}
          onChange={handleAreaChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        >
          <option value="">All Areas</option>
          {areas.map((area) => (
            <option key={area.name} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleReset}
          className="btn btn-primary"
        >
          Reset
        </button>
      </div>
    </div>
  );
} 