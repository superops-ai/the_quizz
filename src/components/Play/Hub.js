import React, { useEffect, useState } from "react";

function Hub(props) {
	const [instance, set_instance] = useState(props.instance);

	useEffect(() => {
	    const url = new URL('http://localhost:3001/.well-known/mercure');
	    
		url.searchParams.append('topic', 'https://localhost:8000/api/instances/{id}');

		const eventSource = new EventSource(url);

		eventSource.onopen = event => {
		    console.log("connected");
		}
	
		eventSource.onmessage = event => {
		    console.log(JSON.parse(event.data));
		}
	}, []);
		
	return (
		<div className="h-100 d-flex flex-column justify-content-center align-items-center">
			<h1>Host : {instance.creator.firstname}</h1>
			<h1>{instance.code}</h1>
			<h1>Players :</h1>
			{
				instance.players.map((player) => {
					return (<h1>-{player.firstname}</h1>);
				})
			}
		</div>
	);
}

export default Hub;