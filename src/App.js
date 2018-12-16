import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  Footer,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Fa
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import { translate } from 'react-i18next';
import "./index.css";
import "./flags/flags.min.css";
import logo from "./flags/blank.gif";
import weDealLogo from './logo.png'

import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () =>
    this.state.collapseID === collapseID && this.setState({ collapseID: "" });

  handleChange = (lng) => {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
  };


  render() {
    const { t } = this.props;

    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );
    return (
      <Router>
        <div className="flyout">
          <Navbar color="indigo" dark expand="md" fixed="top" scrolling>
            <NavbarBrand href="/">
              <img
                src={weDealLogo}
                alt=""
                height="20"
              />{" "}
              Lest's deal
            </NavbarBrand>
            <NavbarToggler
              onClick={this.toggleCollapse("mainNavbarCollapse")}
            />
            <Collapse
              id="mainNavbarCollapse"
              isOpen={this.state.collapseID}
              navbar
            >
              <NavbarNav right>
                <NavItem>
                  <NavLink
                    exact
                    to="/"
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                  >
                    {t('nav.menus.home')}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/create"
                  >
                    {t('nav.menus.edit')}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/offers"
                  >
                    {t('nav.menus.offers')}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/demandes"
                  >
                    {t('nav.menus.demandes')}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={this.closeCollapse("mainNavbarCollapse")}
                    to="/shop"
                  >
                    {t('nav.menus.shop')}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="waves-effect waves-light" to="#!"><Fa icon="twitter" /></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="waves-effect waves-light" to="#!"><Fa icon="google-plus" /></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="waves-effect waves-light d-flex align-items-center" to="#!">1<Fa icon="envelope" className="ml-1" /></NavLink>
                </NavItem>
                <NavItem>
                  <div className="flags">
                    <img src={logo} onClick={() => this.handleChange("fr")} className="flag flag-fr" alt="French" />
                    <img src={logo} onClick={() => this.handleChange("us")} className="flag flag-us" alt="English" />
                  </div>
                </NavItem>
                <NavItem>
                  <Dropdown>
                    <DropdownToggle className="dopdown-toggle" nav>
                      <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" className="rounded-circle z-depth-0" style={{ height: "35px", padding: 0 }} alt="" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-default" right>
                      <DropdownItem href="#!">{t('nav.menus.profile.account')}</DropdownItem>
                      <DropdownItem href="#!"> {t('nav.menus.profile.logout')}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
              </NavbarNav>
            </Collapse>
          </Navbar>
          {this.state.collapseID && overlay}
          <main style={{ marginTop: "4rem" }}>
            <Routes />
          </main>

          <Footer color="indigo">
            <p className="footer-copyright mb-0 py-3 text-center">
              <a href="/"> letsdeal.com </a>
            </p>
          </Footer>
        </div>
      </Router>
    );
  }
}
export default translate('translations')(App);
