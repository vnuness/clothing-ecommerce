
import { Routes, Route } from 'react-router-dom';
import './Shop.scss'

import CategoriesPreview from '../categories-preview/CategoriesPreview';
import Category from '../category/Category';
import { fetchCategoriesStart } from '../../store/categories/category.action';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Shop = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )

}


export default Shop;