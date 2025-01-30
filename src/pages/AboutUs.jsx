import React, { useState, useEffect } from 'react';
import './styles/AboutUs.css';  // Подключаем CSS файл
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const QuizGame = () => {
  const questions = [
    {
      question: "Какой кофе считается самым крепким?",
      options: ["Американо", "Эспрессо", "Латте", "Капучино"],
      answer: "Эспрессо"
    },
    {
      question: "Сколько кофеинок в чашке эспрессо?",
      options: ["1", "2", "3", "4"],
      answer: "1"
    },
    {
      question: "Из какого континента происходит кофе?",
      options: ["Европа", "Южная Америка", "Азия", "Африка"],
      answer: "Африка"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleAnswer = (answer) => {
    const correctAnswer = questions[currentQuestion].answer;
    if (answer === correctAnswer) {
      setScore(score + 1);
      setSnackbarMessage('Правильный ответ!');
    } else {
      setSnackbarMessage('Неправильный ответ!');
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer(null);
    } else {
      setSnackbarMessage(`Игра окончена! Ваш счёт: ${score + (answer === correctAnswer ? 1 : 0)} из ${questions.length}`);
      setScore(0);
      setCurrentQuestion(0);
    }

    setOpenSnackbar(true);
  };

  return (
    <div className="quiz-container">
      <h3 className="quiz-title">Викторина о кофе</h3>
      <div className="quiz-card">
        <p className="question">{questions[currentQuestion].question}</p>
        <div className="options">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="quiz-button"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-us-container">
      <Header />

      <div className="about-us-content">
        <div className="time-section">
          <h2 className="coffee-message">А ТЫ ЕЩЕ НЕ ВЫПИЛ КОФЕ?</h2>
          <h1 className="current-time">{currentTime}</h1>
        </div>

        <div className="about-us-text">
          <h2>О нас</h2>
          <p>
            Мы — небольшая кофейня с душой, где каждый гость может насладиться не только вкусным кофе, но и уютной атмосферой.
          </p>
        </div>

        <div className="facts">
          <h3>Несколько интересных фактов:</h3>
          <ul>
            <li>Наш кофе обжаривается на месте, чтобы сохранять свежесть.</li>
            <li>Мы используем только органические зерна.</li>
            <li>У нас работают профессиональные баристы с многолетним опытом.</li>
          </ul>
        </div>

        <QuizGame />
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
