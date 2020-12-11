import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './menu.css';
import * as eva from 'eva-icons';

function Menu () {
	useEffect(() => {
	    eva.replace();
	}, []);

	return (
		<nav className="w-100 py-3 d-flex justify-content-end">
	      <Link to="/profile">
	      	<i
	          data-eva="person-outline"
	          data-eva-fill="#F2F2F2"
	          data-eva-height="100%"
	          data-eva-width="100%"
	          data-eva-animation="pulse"
	          data-eva-hover="false"
	          data-eva-infinite="true"
	        />
	      </Link>
    	</nav>
	);
}

export default Menu;