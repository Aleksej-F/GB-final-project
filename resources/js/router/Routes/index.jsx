import React from 'react';
import {Route, Routes} from "react-router-dom";
import All from '../../pages/All';
import ArticlesFiltersCategori  from '../../pages/ArticlesFiltersCategori';
import ArticleId from '../../pages/ArticleId'
import { LogIn } from '../../pages/Login';
import { SignUp } from '../../pages/SignUp';
import { ConfirmEmail } from '../../pages/ConfirmEmail';
import { ProtectedRoute } from "../ProtectedRoute";
import { PublicRoute } from "../PublicRoute/Index"
import { useSelector, useDispatch } from "react-redux";
import { getLinksCategoriesAll } from "../../store/categories"
import { Search } from '../../pages/Search';
import { UserSettingsProfile } from '../../pages/UserSettings/Profile';
import  ArticlesFiltersTags  from '../../pages/ArticlesFiltersTags';
import { ArticleCreate }  from '../../pages/ArticleCreate';


const Router = () => {
    const dispatch = useDispatch();
    const categoriesLinks = useSelector(getLinksCategoriesAll)
    return (
        <div className="pages">
            <div className="wrapper">
                <div className="pages-container">
                    <Routes>
                        <Route exact path='/' element={<All/>}/>
                        <Route exact path='/articles/all' element={<All/>}/>

                        <Route exact path='/articles/categories/:id' element={<ArticlesFiltersCategori/>}/>
                        <Route exact path='/articles/tags/:id' element={<ArticlesFiltersTags/>}/>
                        <Route element={<PublicRoute />}>
                            <Route exact path='/login' element={<LogIn/>}/>
                            <Route exact path='/signup' element={<SignUp/>}/>
                        </Route>
                        <Route exact path='/search' element={<Search/>}/>
                        <Route exact path='/confirm_email' element={<ConfirmEmail/>}/>
                        <Route exact path='/article/:articleId' element={<ArticleId/>}/>
                        <Route exact path='/article/:articleId/:comments' element={<ArticleId/>}/>    
                            
                        <Route element={<ProtectedRoute />}>
                            <Route exact path='/auth/settigs/profile' element={<UserSettingsProfile/>}/>
                            <Route exact path='/article/create' element={<ArticleCreate/>}/>
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>
    )
}
export default Router
