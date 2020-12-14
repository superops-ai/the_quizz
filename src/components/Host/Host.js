import React, { useEffect, useState } from "react";
import DAO from "../../DAO";
import Hub from './Hub';
import './host.css';
import moment from 'moment';

function Host(props) {
	const api = new DAO();
	const [instance, set_instance] = React.useState(null);
	const [instances, set_instances] = React.useState([]);
	moment.locale();

	useEffect(() => {
	   	getListOfInstances();
	}, []);

	const createGame = async() => {
        await api.post_instance().then((datas) => {
        	set_instance(datas);
        });
	}

	const getListOfInstances = async() => {
		await api.get_instances().then((datas) => {
			set_instances(datas['hydra:member']);
		});
	}

	const deleteInstance = async(id) => {
		await api.delete_instance(id).then((datas) => {
			getListOfInstances();
		});
	}

	return (
		<main className="offgame-background d-flex flex-column justify-content-center align-items-center">
		
		{
			instance === null ?
				<div className="w-100 h-100 d-flex flex-column justify-content-around align-items-center ">
					<div className="w-75 h-75 pt-5 overflow-auto">
						{
							instances.map((instance) => {
								return (
									<div key={instance.id} className="instance-list-item p-5 my-5 d-flex flex-column">	
										<div className="d-flex justify-content-between">
											<div>
												<h3>Code : {instance.code}</h3>
												<h3>{moment(instance.creation_datetime).format('LLL')}</h3>
											</div>
											<h3>Joueurs dans la room : {instance.players.length}</h3>
										</div>
										<div className="d-flex justify-content-around mt-5">
											<button className="button-instance-list instance-join p-3 text-uppercase">Rejoindre</button>
											<button onClick={() => deleteInstance(instance.id)} className="button-instance-list instance-delete p-3 text-uppercase">Supprimer</button>
										</div>
									</div>
								);
							})
						}
					</div>
					<button onClick={createGame} className="w-75">Créer une partie</button>
				</div>
			:
				<Hub instance={instance} user={props.user} />
		}
		</main>
	);
}

export default Host;