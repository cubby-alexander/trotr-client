import AboutUsPage from "./views/AboutUsPage/AboutUsPage";
import BlogPostPage from "./views/BlogPostPage/BlogPostPage";
import BlogPostsPage from "./views/BlogPostsPage/BlogPostsPage";
import ComponentsPage from "./views/ComponentsPage/ComponentsPage";
import ContactUsPage from "./views/ContactUsPage/ContactUsPage";
import EcommercePage from "./views/EcommercePage/EcommercePage";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import PricingPage from "./views/PricingPage/PricingPage";
import Profile from "./views/appViews/ProfilePage/ProfilePage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import ProductPage from "./views/ProductPage/ProductPage";
import SectionsPage from "./views/SectionsPage/SectionsPage";
import ShoppingCartPage from "./views/ShoppingCartPage/ShoppingCartPage";
import SignupPage from "./views/appViews/SignupPage/SignupPage";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import PresentationPage from "./views/PresentationPage/PresentationPage";
import HomePage from "./views/appViews/HomePage/HomePage";
import {createBrowserHistory} from "history";
import React from "react";
import {Router, Switch, Route} from "react-router";


export default function Routing(props) {
    var hist = createBrowserHistory();
    return(
        <Router history={hist}>
        <Switch>
            <Route path="/about-us" component={AboutUsPage} />
            <Route path="/blog-post" component={BlogPostPage} />
            <Route path="/blog-posts" component={BlogPostsPage} />
            <Route path="/components" component={ComponentsPage} />
            <Route path="/contact-us" component={ContactUsPage} />
            <Route path="/ecommerce-page" component={EcommercePage} />
            <Route path="/landing-page" component={LandingPage} />
            <Route path="/login-page" component={LoginPage} />
            <Route path="/pricing" component={PricingPage} />
            <Route path="/profile" component={Profile} />
            <Route path="/profile-page" component={ProfilePage} />
            <Route path="/product-page" component={ProductPage} />
            <Route path="/sections" component={SectionsPage} />
            <Route path="/shopping-cart-page" component={ShoppingCartPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/error-page" component={ErrorPage} />
            <Route path="/presentation" component={PresentationPage} />
            <Route path="/" component={HomePage} />
        </Switch>
    </Router>
    )
}