import React, {useEffect} from 'react';
import Helper from "./Helper";
import DAO from "./DAO";
import { Route, Switch, BrowserRouter} from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Quizz from "./components/Quizz/Quizz";


function Router() {
	const api = new DAO();
	const help = new Helper();
	const auth_token = help.get_cookie("auth_token");

	useEffect(() => {
		if (auth_token) {
		  get_user();
		}
  	}, []);

	const get_user = () => {
    api.get_auth().then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

	return (
		<BrowserRouter>
			<Switch>
				<Route
					exact
					path="/"
					render={() =>
						<div>
							<Home />
						</div>
					}
				/>
				<Route
					exact
					path="/login"
					render={() =>
						<div>
							<Login />
						</div>
					}
				/>
				<Route
					exact
					path="/register"
					render={() =>
						<div>
							<Register />
						</div>
					}
				/>
				<Route
					exact
					path="/player/quizz"
					render={() =>
						<div>
							<Quizz />
						</div>
					}
				/>
				<Route
					exact
					path="/presentator/quizz"
					render={() =>
						<div>
							<Quizz />
						</div>
					}
				/>
			</Switch>
		</BrowserRouter>
	);
}

export default Router