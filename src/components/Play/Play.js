import React, { useEffect, useState } from "react";
import './play.css';
import DAO from "../../DAO";
import * as eva from 'eva-icons';
import Hub from './Hub';

function Play(props) {
	const [connected, set_connected] = React.useState(false);
	const [code, set_code] = useState('');
	const [instance, set_instance] = useState({});

	const api = new DAO();

	useEffect(() => {
	    eva.replace();
	}, []);

	const handleOnChange = (e) => {
        if (e.target.name === "code")
        	set_code(e.target.value);
    }

    const joinGame = async(e) => {
    	if (!code)
    		return;
    	e.preventDefault();
    	await api.get_instance(code).then((datas) => {	
    		if (datas['hydra:totalItems'] === 1) {
    			let instance = datas['hydra:member'][0];
    			set_instance(instance);
    			set_connected(true);
    		} else {
    			console.log("Aucune partie trouvée");
    		}
    	});
    }

	return (
		<main className="offgame-background">
			{connected === false ?
				<div className="h-100 d-flex flex-column justify-content-center align-items-center">
					<i
			          data-eva="play-circle-outline"
			          data-eva-fill="#F2F2F2"
			          data-eva-height="50%"
			          data-eva-width="80%"
			          data-eva-animation="flip"
				      data-eva-hover="false"
				      data-eva-infinite="false"
			        />
			        <form className="w-75 d-flex flex-column">
			        	<input placeholder="Code" onChange={handleOnChange} type="text" name="code" value={code} />
			        	<button onClick={joinGame} className="mt-5" type="submit">Rejoindre</button>
			        </form>
				</div>
			: <Hub instance={instance} user={props.user} /> }
		</main>
	);
}

export default Play;