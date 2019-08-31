import React from 'react';
import './App.css';


// 1. Declaration of accurateInterval that will be help the software to decrement a timestamp accuratly.
// 1---------------------------------------------
var accurateInterval = require('accurate-interval');
// 1---------------------------------------------


// 2. Add a class CircleTimer. This create the circle representation of the timer. I implement the props percentage to display the correct segment of circle.
// 2---------------------------------------------
class CircleTimer extends React.Component
{
	render()
	{
		return(
				<svg viewBox="0 0 40 40" className="circle">
					<circle  
						transform="rotate(-90 31.831 31.831)" 
						stroke="black" 
						cx="43" cy="20" r="15.9155" 
						strokewith="2px" 
						fill="none" 
						strokeDasharray={this.props.percentage + ', 100'}/>
				</svg>
		);
	}
}
// 2---------------------------------------------


// 3. Create a component that render the page based on the timer.
// 3---------------------------------------------
class App extends React.Component
{
	// 3.1. In the constructor, the var percentage represents the 100 stroke Dash of the circle. The var StoredIntervalFunction allows us to use the accurate interval package 
	// 3.1-----------------------------------
	constructor(props)
	{
		super(props);
		this.state = {
			'percentage': 100,
			'storedIntervalFunction': ''
		}
		this.trigger = this.trigger.bind(this);
	}
	// 3.1-----------------------------------

	// 3.2. Trigger runs the timer. It starts when the user click on run.
	// 3.2-----------------------------------
	trigger()
	{
		if(this.state.percentage > 0)
		this.setState({storedIntervalFunction : accurateInterval(() => {
			this.setState({percentage: this.state.percentage - 0.5});
		}, 5)});
		else
		{
			this.state.storedIntervalFunction.clear();
			this.setState({percentage: 100});
		}
	}
	// 3.2-----------------------------------


	render()
	{
		return (
			<div className="App">
				<button onClick={this.trigger}>Run</button>
				<CircleTimer percentage={this.state.percentage}/>
			</div>
		);
	}
}
// 3---------------------------------------------
export default App;
