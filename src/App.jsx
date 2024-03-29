import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/auth-context';
import { useDispatch } from 'react-redux';
import { counterActions } from './store/gameCounter';
import Welcome from './components/Welcome';
import StartGame from './components/StartGame';
import Game from './components/Game';

function App() {
	const authContext = useContext(AuthContext);
	const [difficulty, setDifficulty] = useState('medium');
	const [questionsAmount, setQuestionsAmount] = useState(5);
	const [isGameSet, setIsGameSet] = useState(false);
	const [questions, setQuestions] = useState(null);
	const [url, setUrl] = useState('');
	const dispatch = useDispatch();

	const radioClickHandler = event => {
		setDifficulty(event.currentTarget.value);
	};

	const questionsAmountHandler = event => {
		setQuestionsAmount(event.currentTarget.value);
	};

	const cleaner = () => {
		setIsGameSet(false);
		dispatch(counterActions.clean());
		setQuestions(null);
	};

	useEffect(() => {
		if (isGameSet) {
			fetch(url)
				.then(res => res.json())
				.then(data => setQuestions(data));
		}
	}, [url, isGameSet]);

	const submitHandler = event => {
		event.preventDefault();
		setUrl(`https://the-trivia-api.com/api/questions?limit=${questionsAmount}&region=PL&difficulty=${difficulty}`);
		setIsGameSet(true);
	};

	let content;
	if (!authContext.isAuth && !isGameSet) {
		content = <Welcome />;
	}

	if (authContext.isAuth && !isGameSet) {
		content = (
			<StartGame
				onRadioChange={radioClickHandler}
				onQuestionsAmountChange={questionsAmountHandler}
				difficulty={difficulty}
				prepareGame={submitHandler}
				questionsAmount={questionsAmount}
			/>
		);
	}

	if (authContext.isAuth && isGameSet && questions) {
		content = <Game questions={questions} cleaner={cleaner} />;
	}

	return <div className='app'>{content}</div>;
}

export default App;
