import React, {useEffect} from 'react';
import { Routes, Route, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDbArticlesAll, getDbArticlesFilters} from "../../store/articles"
import { getCategoriesAll } from "../../store/categories"
import ArticlesList from '../../components/Articles/ArticlesList';

function ArticlesFiltersCategori() {
  let params = useParams();
  const dispatch = useDispatch(); 
  const id = parseInt(params.id)
  const categories = useSelector(getCategoriesAll)
  const categoryIdTitle = categories.filter(item => item.id == id)[0].title
 
  useEffect(()=> {
    dispatch( getDbArticlesFilters(`/api/articles?filters[category]=${id}`));
  },[id]) 

  return (
    <>
      <h3 className='pages-header'>{ categoryIdTitle }</h3> 
      <ArticlesList param = {`/api/articles?filters[category]=${parseInt(id)}&`} />
    </>
  )
}
  
export default ArticlesFiltersCategori;