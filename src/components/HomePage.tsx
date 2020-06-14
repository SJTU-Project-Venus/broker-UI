import React from 'react';
import background from '../img/background.jpg';

const HomePage = () => {
	const height = window.screen.height
	return (
		<React.Fragment>
			<div
				style={{
					height:height*0.82,
					backgroundImage: `url(${background})`,
					backgroundSize: 'cover ',
				}}
			></div>
		</React.Fragment>
	);
};

export default HomePage;
