import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './home.css';
import * as eva from 'eva-icons';

function Home() {
  useEffect(() => {
    // add this line
    eva.replace();
  }, []);

  return (
    <main className="offgame-background d-flex flex-column">

      <div className="w-100 h-75 d-flex flex-column align-items-center justify-content-center">
        <i
          data-eva="checkmark-circle-outline"
          data-eva-fill="#FFFFFF"
          data-eva-height="15%"
          data-eva-width="30%"
        />
        <h1 className="w-75 text-center">Le Grand Quizz</h1>
        <h2 className="w-75 text-center mt-5">Êtes-vous assez cultivé pour relever le défi ?</h2>
      </div>

      <div className="w-100 h-25 d-flex flex-column align-items-center justify-content-between">
        <Link to="/register" className="w-50"><button className="w-100">Créer un compte</button></Link>
        <Link to="/login" className="link-login-page w-100 text-center py-4">
          Déjà utilisateur ? Connectez-vous
        </Link>
      </div>

    </main>
  );
}

export default Home;
