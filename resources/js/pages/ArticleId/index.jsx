import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDbArticle, getArticle } from "../../store/articles"
import { getDbCommentsArticle, getMainCommentVisible } from "../../store/comments"
import './ArticleId.scss'
import ArticleStatsIcons from '../../components/Articles/ArticleStatsIcons.jsx'
import Comments from '../../components/Comments/Comments';
import MainComment from '../../components/Comments/MainComment';

function ArticleId() {
  const dispatch = useDispatch(); 
  const params = useParams();
  const mainCommentVisible = useSelector(getMainCommentVisible);
  const commentsParam = params.comments === 'comments'
  const  articleId  =  parseInt(params.articleId);
  console.log("params - ", commentsParam )
  
  let article = useSelector(getArticle);
  
  console.log('article - ',article)
  
  useEffect(()=>{ 
    window.scroll(0, 0);
    const id = articleId
    dispatch(getDbArticle(id))
    dispatch( getDbCommentsArticle(id));
  },[])

  return (
    <>
      { article !== undefined ? 
        <>
          <div className="pages-header">
            <h3 >articleId { articleId } </h3> 
          </div>
          <div className="articleId">
            <div className="articleId__header ">
              <h4> {article.user.nickName}</h4>
              <h5> &emsp;{article.created_at}&ensp;</h5>
            </div>
            <div className='articleId__title'>
              {commentsParam ? <Link to={`/article/${article.id}`} className="nav-btn">
                <h4>{article.title}</h4>
              </Link> :
                
                <h4>{article.title}</h4>}
            </div>
            {
              commentsParam ? '':  
              <div className='articleId__description'>
                <p>{article.description}</p>
              </div>
            }
            <div className='articleId__tags'>
              <p><span className='articleId__tags-span'>Теги:&ensp;</span>
                {
                  article.tags.length > 0 ? article.tags.map((item, key) =>(
                    <Link to={`/articles/tags/${item.id}`} className="nav-btn">
                      <span key = {key}> {item.title}{key<article.tags.length - 1 ? ',' : '' } </span>
                    </Link>
                  )) : ''
                }
              </p>
            </div>  
          </div>
          <div className="articleId articleId-icons">
            <ArticleStatsIcons articleId="true" item={article}/>
          </div> 
          <div className="articleId ">
            <Comments id = { articleId } />
          </div>
          { mainCommentVisible ? 
            <div className="articleId ">
              <MainComment articleId={articleId}/>
            </div>: ''
          }
        </> : ''
      }
    </>
  );
}
  
export default ArticleId;