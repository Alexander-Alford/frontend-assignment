import logo from '../images/logo.svg';
import MovieGrid from './Movies.js';

const App = () => (
	<main className="main-content">
		<div>
			<h1 className="header">
				<img src={logo} alt="Timescale" />
				<form onSubmit={ (e) => e.preventDefault() }>
					<button type="submit" style={{height: "31px", width: "31px"}}>O</button>
					<input type="text" className="text-input"/>
				</form>
			</h1>
				<MovieGrid />
		</div>
	</main>
)

export default App;
