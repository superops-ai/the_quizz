import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import './register.css';
import * as eva from 'eva-icons';
import DAO from "../../DAO";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Helper from "../../Helper";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Register() {
    const [email, set_email] =  useState('');
    const [password, set_password] =  useState('');
    const [firstname, set_firstname] = useState('');
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);

    const api = new DAO();
    const help = new Helper();
    
    const handleOnChange = (e) => {
        if (e.target.name === "email")
          set_email(e.target.value);
        else if (e.target.name === "password")
          set_password(e.target.value);
        else if (e.target.name === "firstname")
          set_firstname(e.target.value);
    }

	useEffect(() => {
	    eva.replace();
	 }, []);

	const handleClick_success = () => {
        setOpenSuccess(true);
    };

    const handleClose_success = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpenSuccess(false);
    };

    const handleClick_error = () => {
        setOpenError(true);
    };

    const handleClose_error = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpenError(false);
    };

	const register = async(e) => {
		console.log(e);

		if (!email || !password || !firstname)
			return;

		const regexEmail = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}'
        if (email.search(regexEmail) < 0)
            return;

        e.preventDefault();

        let json = {
        	email: email,
        	roles: ["player"],
        	password: password,
        	firstname: firstname
        };
        help.set_cookie("mercureAuthorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InN1YnNjcmliZSI6W10sInB1Ymxpc2giOlsiKiJdfX0.65srwH3sOu6QIicqD2H2jrSVWvzIoVdTfGB3gKTCyU4");
        await api.post_users(JSON.stringify(json)).then((datas) => {
        	handleClick_success();
        	setTimeout(function() {
				window.location.href = "/login";
			}, 2500);
        }).catch(()=> handleClick_error());
	}

	return (
		<main className="offgame-background d-flex flex-column">
			<div className="h-50 d-flex flex-column justify-content-center align-items-center">
				<i
		          data-eva="people-outline"
		          data-eva-fill="#FFFFFF"
		          data-eva-height="45%"
		          data-eva-width="45%"
		        />
				<h1>S'inscrire</h1>
			</div>
			<form className="w-100 h-50 d-flex flex-column justify-content-between" method="post">
				<div className="w-100 d-flex flex-column justify-content-center align-items-center">
					<input onChange={handleOnChange} className="w-75" type="text" name="firstname" value={firstname} placeholder="Prénom" required />
					<input onChange={handleOnChange} className="mt-5 w-75" type="email" name="email" value={email} placeholder="Adresse email" required />
					<input onChange={handleOnChange} className="mt-5 w-75" type="password" name="password" value={password} placeholder="Mot de passe" required />
					<Link to="/login" className="mt-5 link-login-page">Déjà un compte ? Connectez-vous !</Link>
				</div>
				<button onClick={register} className="w-100 connexion-button" type="submit">Créer un compte</button>
			</form>
			<Snackbar
              open={openSuccess}
              autoHideDuration={2000}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              onClose={handleClose_success}
            >
              <Alert onClose={handleClose_success} severity="success">
                Votre compte a bien été créer !
              </Alert>
            </Snackbar>
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

export default Register;