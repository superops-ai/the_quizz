import React, { useEffect, useState } from "react";
import DAO from "../../DAO";

function Hub(props) {
	const [instance, set_instance] = useState(props.instance);

	const api = new DAO();
	useEffect(() => {
	    const url = new URL('http://localhost:3001/.well-known/mercure');
		url.searchParams.append('topic', 'https://localhost:8000/api/instances/{id}');
		url.searchParams.append('topic', 'https://localhost:8000/api/users/{id}');
		const eventSource = new EventSource(url);

		eventSource.onmessage = event => {
		    if (JSON.parse(event.data)['@type'] === "User") {
		    	update_instance(instance['code']);
		    }
		}
	}, []);

	const update_instance = async(code) => {
		await api.get_instance(code).then((datas) => {
			set_instance(datas['hydra:member'][0]);
		})
	}

	return (
		<div className="h-100 w-100 d-flex flex-column justify-content-around align-items-center">
			<div className="d-flex w-100 h-75 flex-wrap align-content-start pt-5 justify-content-around">
			{
				instance.players.map((player) => {
					return (
						<div key={player.id} className="m-5 d-flex flex-column align-items-center">
							<div className="avatar">
								<img src={'avatars/' + player.firstname +'.jpg'} alt={player.firstname} />
							</div>
							<p className="mt-2 playersNames">{player.firstname}
							</p>
						</div>	
					);
				})
			}
			</div>
			<button disable={instance.players.length >= 1 ? false : true} className="w-75 text-uppercase">Commencer la partie</button>
			<h1>{instance.code}</h1>
		</div>
	);
}

export default Hub;