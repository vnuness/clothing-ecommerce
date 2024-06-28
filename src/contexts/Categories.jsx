
import { createContext, useState, useEffect } from 'react'

import { getCategoriesAndDocuments } from '../utils/firebase.js';

export const CategoriesContext = createContext({
  categoriesMap: {},
  setCategories: () => null,
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap, setCategoriesMap };

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();

      setCategoriesMap(categoryMap);
    }


    getCategoriesMap();
  }, []);


  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}