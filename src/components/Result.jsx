import { useSelector } from 'react-redux';
import React, { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import styles from './Result.module.css';

export default function Result({ questionsAmount, cleaner }) {
	const counter = useSelector(state => state.counter.counter);
	const authContext = useContext(AuthContext);
	const name = authContext.name;
	const result = counter/questionsAmount;

	const verdict = () => {
		switch (true) {
			case result > 0.95:
				return `Excellent ${name}! You are the best!`;
			case 0.95 >= result && result > 0.75:
				return `Great job ${name}! Time to celebrate!`;
			case 0.75 >= result && result > 0.5:
				return `Well done ${name}!`;
			case 0.5 >= result && result > 0.25:
				return `${name}, you need to practice more!`;
			case result <= 0.25:
				return `${name}, not very well. Mayby try again?`;
		}
	};

const clickHandler= () => {
    cleaner()
}

	return (
		<div>
			<p className={styles.title}>{verdict()}</p>
			<p className={styles.result}>
				Twój wynik to {counter}/{questionsAmount}
			</p>
			<button onClick={clickHandler} className={styles.button}>Try Again?</button>
		</div>
	);
}
