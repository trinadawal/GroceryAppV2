import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/AuthService";
import Login from "./components/LoginComponent";
import Register from "./components/RegisterComponent";
import Home from "./components/HomeComponent";
import Profile from "./components/ProfileComponent";
import BoardUser from "./components/BoardUserComponent";
import BoardAdmin from "./components/BoardAdminComponent";
import BoardSuperAdmin from "./components/BoardSuperadminComponent";
import { FaSignOutAlt } from "react-icons/fa";
import ItemListComponent from "./components/ItemListComponent";
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showSuperAdminBoard: user.roles.includes("ROLE_SUPERADMIN"),
        showSignUp: user.roles.includes("ROLE_SUPERADMIN" , "ROLE_ADMIN"),
        showItemsList: user.roles.includes("ROLE_USER")
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, showAdminBoard, showSuperAdminBoard , showSignUp , showItemsList } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            eMart
          </Link>
          <div className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li> */}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
            {showSuperAdminBoard && (
              <li className="nav-item">
                <Link to={"/superadmin"} className="nav-link">
                  Super Admin Board
                </Link>
              </li>
            )}
            {showSignUp && (
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Create New User
                </Link>
              </li>
            )}
            {showItemsList && (
              <li className="nav-item">
              <Link to={"/itemslist"} className="nav-link">
                Items List
              </Link>
            </li>
            )}
            {/* {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )} */}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.userName}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  <FaSignOutAlt />&nbsp;LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/superadmin" component={BoardSuperAdmin} />
            <Route path="/itemslist" component={ItemListComponent} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;