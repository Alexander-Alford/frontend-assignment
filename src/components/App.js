import logo from '../images/logo.svg';
import MovieGrid from './Movies.js';
import { useState } from 'react';

//The header component that includes the timescale logo and the search bar.
const Header = (props) => {
	//Holds unsubmitted text.
	const [text, setText] = useState("");

	return(
		<div>
			<h1 className="header">
				<img src={logo} alt="Timescale" />
				<form onSubmit={ (e) => {e.preventDefault(); props.setQuery(text);} }>
					<button type="submit" className="search-button"><i style={{color: "#cccccc"}} className="fas fa-search"></i></button>
					<input type="text" value={text} className="text-input" placeholder="Search for a movie" onInput={(e) => setText(e.target.value)}/>
				</form>
			</h1>
			<hr style={{margin: "0px 0px 20px 0px"}}/>
			<h3>{ (props.queryStr.trim()) ? ('Search for "' + props.queryStr.trim() + '"') : ("Most Recent Movies") }</h3>
		</div>
	);
}

const App = () => {
	//Holds the submitted text string. 
	const [queryStr, setQuery] = useState("");


	return (
	<main className="main-content">
		<div>
			<Header queryStr={queryStr} setQuery={setQuery}/>	
			<MovieGrid queryStr={queryStr}/>
		</div>
	</main>
	)}

export default App;
