import React, { useState, useEffect} from 'react';
import Helper from "./Helper";
import DAO from "./DAO";
import { Route, Switch, BrowserRouter, Redirect} from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Quizz from "./components/Quizz/Quizz";
import Menu from "./components/Menu/Menu";

import Play from "./components/Play/Play";
import History from "./components/History/History";
import Host from "./components/Host/Host";
import Spectate from "./components/Spectate/Spectate";
import Profile from "./components/Profile/Profile";
import Decks from "./components/Decks/Decks";

function Router() {
	const [user, set_user] = useState(null);
	const api = new DAO();
	const help = new Helper();
	const auth_token = help.get_cookie("auth_token");

	useEffect(() => {
		if (auth_token) {
		  get_user();
		}
		// eslint-disable-next-line
  	}, []);

	const get_user = () => {
	    api.get_auth().then((data) => {
	        set_user(data);
	      })
	      .catch((error) => {
	    });
	 };

	return (
		<BrowserRouter>
			<Switch>
				<Route
					exact
					path="/"
					render={() =>
						!auth_token ? (
							<div>
								<Home />
							</div>
						) : (
							<Redirect to="/play" />
						)
					}
				/>
				<Route
					exact
					path="/login"
					render={() =>
						!auth_token ? (
							<div>
								<Login />
							</div>
						) : (
							<Redirect to="/play" />
						)
					}
				/>
				<Route
		          exact
		          path="/logout"
		          render={() => {
		            help.delete_all_cookies();
		          }}
		        />
				<Route
					exact
					path="/register"
					render={() =>
						!auth_token ? (
							<div>
								<Register />
							</div>
						) : (
							<Redirect to="/play" />
						)
					}
				/>
				<Route
					exact
					path="/profile"
					render={() =>
						auth_token ? (
							<div>
								<Profile />
								<Menu />
							</div>
						) : (
							<Redirect to="/" />
						)
					}
				/>
				<Route
					exact
					path="/play"
					render={() =>
						auth_token ? (
							<div>
								<Play user={user} />
								<Menu />
							</div>
						) : (
							<Redirect to="/" />
						)
					}
				/>
				<Route
					exact
					path="/host"
					render={() =>
						auth_token ? (
							<div>
								<Host user={user} />
								<Menu />
							</div>
						) : (
							<Redirect to="/" />
						)
					}
				/>
				<Route
					exact
					path="/decks"
					render={() =>
						auth_token ? (
							<div>
								<Decks />
								<Menu />
							</div>
						) : (
							<Redirect to="/" />
						)
					}
				/>
				<Route
					exact
					path="/spectate"
					render={() =>
						auth_token ? (
							<div>
								<Spectate />
								<Menu />
							</div>
						) : (
							<Redirect to="/" />
						)
					}
				/>
				<Route
					exact
					path="/history"
					render={() =>
						auth_token ? (
							<div>
								<History />
								<Menu />
							</div>
						) : (
							<Redirect to="/" />
						)
					}
				/>
				<Route
					exact
					path="/player/quizz"
					render={() =>
						auth_token ? (
							<div>
								<Quizz />
							</div>
						) : (
							<Redirect to="/" />
						)
					}
				/>
				<Route
					exact
					path="/presentator/quizz"
					render={() =>
						auth_token ? (
							<div>
								<Quizz />
							</div>
						) : (
							<Redirect to="/" />
						)
					}
				/>
			</Switch>
		</BrowserRouter>
	);
}

export default Router