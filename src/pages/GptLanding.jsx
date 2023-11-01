import React, { useState } from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';

import { QueryClient, useQuery } from '@tanstack/react-query';

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const searchCocktailsQuery = (searchTerm, filter) => {
  let apiUrl;
  if (filter === 'Non_Alcoholic') {
    apiUrl =
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';
  } else if (filter === 'Alcoholic') {
    apiUrl =
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
  } else {
    apiUrl = `${cocktailSearchUrl}${searchTerm}`;
  }

  return {
    queryKey: ['search', searchTerm || 'all', filter || ''],
    queryFn: async () => {
      const response = await axios.get(apiUrl);
      return response.data.drinks;
    }
  };
};

export const loader =
  QueryClient =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search') || '';
    await QueryClient.ensureQueryData(searchCocktailsQuery(searchTerm, ''));
    return { searchTerm };
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm, '')); // Initialize with random drinks
  const [filter, setFilter] = useState('');

  const handleFilter = newFilter => {
    setFilter(newFilter);
  };

  return (
    <>
      <div>
        <button onClick={() => handleFilter('Alcoholic')}>Alcoholic</button>
        <button onClick={() => handleFilter('Non_Alcoholic')}>
          Non-Alcoholic
        </button>
      </div>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
