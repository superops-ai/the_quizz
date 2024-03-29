import React, { useEffect, useState } from "react";
import DAO from "../../DAO";
import './play.css';

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

		new_player();
		
	}, []);

	const update_instance = async(code) => {
		await api.get_instance(code).then((datas) => {
			if (datas['hydra:member'][0])
				set_instance(datas['hydra:member'][0]);
			else
				window.location.reload();
		})
	}

	const new_player = async() => {
		let json = {
			id: instance.id
		}
		await api.join_instance(json).then((datas) => {	
    		set_instance(datas);
    	});
	}

	const leave_instance = async() => {
		let json = {
			id: instance.id
		}
		await api.leave_instance(json).then((datas) => {
			window.location.reload();
    	});
	}

	return (
		<div className="h-100 d-flex flex-column justify-content-around align-items-center">
			<div className="d-flex w-100 h-75 flex-wrap align-content-start pt-5 justify-content-around">
			{
				instance.players.map((player) => {
					return (
						<div key={player.id} className="m-5 d-flex flex-column align-items-center">
							<div className="avatar">
								<img src={'avatars/' + player.firstname +'.jpg'} alt={player.firstname} />
							</div>
							<p className="mt-2 playersNames">{player.firstname}
								{player.firstname === props.user.firstname ? ' (Vous)' : ''}
							</p>
						</div>	
					);
				})
			}
			</div>
			<button className="w-75 text-uppercase" onClick={leave_instance}>Quitter</button>
		</div>
	);
}

export default Hub;