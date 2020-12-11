import React, { useEffect } from "react";
import * as eva from 'eva-icons';
import './quizz.css';

function Quizz() {
	//let conn = new WebSocket('ws://localhost:8080');
	useEffect(() => {
	    eva.replace();
	 }, []);

	const sendAnswer = (answer) => {
		answer = {user: "Dylan", answer: answer};
		//conn.send(JSON.stringify(answer));
	}

	return (
		<main className="offgame-background d-flex flex-column">
			<div className="h-50 d-flex flex-column justify-content-center align-items-center">
				<i
		          data-eva="question-mark-circle-outline"
		          data-eva-fill="#FFF"
		          data-eva-height="45%"
		          data-eva-width="45%"
		          data-eva-animation="pulse"
		          data-eva-hover="false"
		          data-eva-infinite="true"
			    />
				<p className="w-75 text-center question">Quand est sorti le film d'animation "Blanche-Neige et les 7 nains ?"</p>
			</div>
			<div className="h-50 d-flex flex-wrap justify-content-around align-items-center">
				<button onClick={() => sendAnswer("A")} className="answer-button answer-a">1937</button>
				<button onClick={() => sendAnswer("B")} className="answer-button answer-b">1947</button>
				<button onClick={() => sendAnswer("C")} className="answer-button answer-c">1957</button>
				<button onClick={() => sendAnswer("D")} className="answer-button answer-d">1967</button>
			</div>
		</main>
	);
}

export default Quizz;