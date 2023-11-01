import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';

let cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

import { QueryClient, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const searchCocktailsQuery = (searchTerm, filter) => {
  console.log(searchTerm, filter);
  if (filter === 'Non_Alcoholic') {
    cocktailSearchUrl =
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';
  } else if (filter === 'Alcoholic') {
    cocktailSearchUrl =
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
  } else {
    cocktailSearchUrl = `${cocktailSearchUrl}${searchTerm}`;
  }
  return {
    queryKey: ['search', searchTerm || 'all', filter],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    }
  };
};

export const loader =
  QueryClient =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search') || '';
    await QueryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    return { searchTerm };
  };

const Landing = () => {
  const [filter, setFilter] = useState(''); //create filter state
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm, filter));

  const handleFilter = newFilter => {
    console.log(newFilter);
    setFilter(newFilter);
  };

  return (
    <>
      <div className="filter-btns">
        <button
          type="button "
          className="btn  filter-btn"
          onClick={() => handleFilter('')}
        >
          All
        </button>
        <button
          type="button"
          className="btn filter-btn"
          onClick={() => handleFilter('Alcoholic')}
        >
          Alcoholic
        </button>
        <button
          type="button"
          className="btn filter-btn"
          onClick={() => handleFilter('Non_Alcoholic')}
        >
          Non-Alcoholic
        </button>
      </div>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};
export default Landing;
