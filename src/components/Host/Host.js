import DAO from "../../DAO";

function Host(props) {
	const api = new DAO();

	const createGame = async() => {
		console.log("J'appuie sur le bouton");
		console.log(props.user);

		let conn = new WebSocket('ws://localhost:8080');

        await api.post_instance().then((datas) => {
        	console.log(datas);

        	let send = {
        		code: datas.code,
        		action: 'A instance are created by ' + props.user.firstname
        	}
			conn.send(JSON.stringify(send));
        });
	}

	return (
		<main className="offgame-background d-flex justify-content-center align-items-center">
			<button onClick={createGame}>Créer une partie</button>
		</main>
	);
}

export default Host;