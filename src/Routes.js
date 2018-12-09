import React from "react";
import { Route, Switch } from "react-router-dom";

//pages
import HomePage from "./pages/home/HomePage";
import OfferPage from "./pages/offer/OfferPage";
import DemandePage from "./pages/demande/DemandePage";
import DetailsPage from "./pages/details/DetailsPage";
import EditPage from "./pages/edit/EditPage";
import AboutPage from "./pages/about/AboutPage";
import SummaryPage from "./pages/edit/SummaryPage";
import shopPage from "./pages/shop/shopPage";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/offers" component={OfferPage} />
        <Route path="/demandes" component={DemandePage} />
        <Route path="/details/:id" component={DetailsPage} />
        <Route path="/create" component={EditPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/edit/:id" component={EditPage} />
        <Route path="/summary/:id" component ={SummaryPage}/>
        <Route path="/shop" component ={shopPage}/>
        <Route
          render={function() {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
