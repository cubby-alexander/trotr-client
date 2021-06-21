import AboutUsPage from "./views/AboutUsPage/AboutUsPage";
import BlogPostPage from "./views/BlogPostPage/BlogPostPage";
import BlogPostsPage from "./views/BlogPostsPage/BlogPostsPage";
import ComponentsPage from "./views/ComponentsPage/ComponentsPage";
import ContactUsPage from "./views/ContactUsPage/ContactUsPage";
import EcommercePage from "./views/EcommercePage/EcommercePage";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/appViews/AuthenticationViews/LoginPage/LoginPage";
import PricingPage from "./views/PricingPage/PricingPage";
import Profile from "./views/appViews/ProfilePage/ProfilePage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import ProductPage from "./views/ProductPage/ProductPage";
import SectionsPage from "./views/SectionsPage/SectionsPage";
import ShoppingCartPage from "./views/ShoppingCartPage/ShoppingCartPage";
import SignupPage from "./views/appViews/AuthenticationViews/SignupPage/SignupPage";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import PresentationPage from "./views/PresentationPage/PresentationPage";
import HomePage from "./views/appViews/HomePage/HomePage";
import SetUpForms from "./views/appViews/SetUpForms/SetUpForms";
import ResetRequest from "./views/appViews/AuthenticationViews/ResetPage/ResetRequest";
import {createBrowserHistory} from "history";
import React, {useContext} from "react";
import {Router, Switch, Route} from "react-router";
import ApplicationContext from "./ApplicationContext";


export default function Routing(props) {
    const context = useContext(ApplicationContext);
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
            <Route path="/pricing" component={PricingPage} />
            <Route path="/profile-page" component={ProfilePage} />
            <Route path="/product-page" component={ProductPage} />
            <Route path="/sections" component={SectionsPage} />
            <Route path="/shopping-cart-page" component={ShoppingCartPage} />
            <Route path="/error-page" component={ErrorPage} />
            <Route path="/presentation" component={PresentationPage} />
            <Route path="/login-page" component={LoginPage} />
            <Route path="/reset" component={ResetRequest} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/user/:id/setup" component={SetUpForms} />
            <Route path="/user/:id" component={Profile} />
            <Route path="/" component={HomePage} />
        </Switch>
    </Router>
    )
}