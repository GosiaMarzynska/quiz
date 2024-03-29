import React, { useContext, useRef } from 'react';
import { AuthContext } from '../context/auth-context';
import classes from './Welcome.module.css';
import Card from '../UI/Card';
import bulbIcon from '../assets/bulbIcon.svg'

export default function Welcome() {
	const authContext = useContext(AuthContext);
    const nameRef = useRef();

	const submitHandler = event => {
		event.preventDefault();
		authContext.login(nameRef.current.value);
	};

	return (
		<Card>
			<h1 className={classes.title}>Welcome to Quiz<img src={bulbIcon} alt=''/>Game!</h1>
			<form onSubmit={submitHandler} className={classes.form}>
				<p>
					<label htmlFor='name'>Please enter your name</label>
					<input type='text' id='name' name='name' ref={nameRef} required />
				</p>
				<div className={classes.actions}>
					<button type="submit">OK</button>
				</div>
			</form>
		</Card>
	);
}
