import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import './login.css';
import DAO from "../../DAO";
import Helper from "../../Helper";
import * as eva from 'eva-icons';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login() {
	const [email, set_email] =  useState('');
  const [password, set_password] =  useState('');
  const [openError, setOpenError] = React.useState(false);

	const api = new DAO();
	const help = new Helper();

	const handleOnChange = (e) => {
        if (e.target.name === "email")
        	set_email(e.target.value);
        else if (e.target.name === "password")
        	set_password(e.target.value);
    }

    const handleClick_error = () => {
        setOpenError(true);
    };

    const handleClose_error = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpenError(false);
    };

	useEffect(() => {
	    // add this line
	    eva.replace();
	 }, []);

	const login = async(e) => {
		if (!email || !password)
			return;

		const regexEmail = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}';
    if (email.search(regexEmail) < 0)
        return;

    e.preventDefault();
    let json = {
    	email: email,
    	password: password
    }

    await api.login(JSON.stringify(json)).then((datas) => {
      help.set_cookie("mercureAuthorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InN1YnNjcmliZSI6W10sInB1Ymxpc2giOlsiKiJdfX0.65srwH3sOu6QIicqD2H2jrSVWvzIoVdTfGB3gKTCyU4");
    	help.set_cookie("auth_token", datas.token);
    	window.location.href = "/player/quizz";
    }).catch(()=> handleClick_error());
	}

	return (
		<main className="offgame-background d-flex flex-column">
			<div className="h-50 d-flex flex-column justify-content-center align-items-center">
				<i
		          data-eva="unlock-outline"
		          data-eva-fill="#FFFFFF"
		          data-eva-height="45%"
		          data-eva-width="45%"
		        />
				<h1>Se connecter</h1>
			</div>
			<form className="w-100 h-50 d-flex flex-column justify-content-between">
				<div className="w-100 d-flex flex-column justify-content-center align-items-center">
					<input onChange={handleOnChange} className="w-75" type="email" name="email" value={email} placeholder="E-Mail" />
					<input onChange={handleOnChange} className="mt-5 w-75" type="password" name="password" value={password} placeholder="Mot de passe" />
					<Link to="/register" className="mt-5 link-register-page">Pas de compte ? Inscrivez-vous !</Link>
				</div>
				<button onClick={login} className="w-100 connexion-button" type="submit">Connexion</button>
			</form>
			<Snackbar
              open={openError}
              autoHideDuration={2000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              onClose={handleClose_error}
            >
              <Alert onClose={handleClose_error} severity="error">
                Une erreur est survenue..
              </Alert>
        	</Snackbar>
		</main>
	);
}

export default Login;