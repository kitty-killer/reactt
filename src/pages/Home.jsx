import React, { useState, useEffect } from 'react';
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import './styles/Home.css'; 

const Home = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [gameMode, setGameMode] = useState('human'); 
    const [winner, setWinner] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isDraw, setIsDraw] = useState(false); 

    useEffect(() => {
        const currentWinner = calculateWinner(board);
        if (currentWinner) {
            setWinner(currentWinner);
            setShowModal(true);
        } else if (board.every(square => square)) {
            setIsDraw(true); 
            setShowModal(true);
        }
    }, [board]);

    const handleClick = (index) => {
        if (board[index] || winner) return; 
        const newBoard = board.slice();
        newBoard[index] = isXNext ? '☕' : '🍩'; 
        setBoard(newBoard);
        setIsXNext(!isXNext);

        
        if (gameMode === 'computer' && !winner) {
            setTimeout(() => {
                makeComputerMove(newBoard);
            }, 500); 
        }
    };


    const makeComputerMove = (newBoard) => {
        const emptySquares = newBoard.map((val, index) => (val === null ? index : null)).filter(val => val !== null);
        const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        newBoard[randomIndex] = '🍩'; 
        setBoard(newBoard);
        setIsXNext(true);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setIsDraw(false); 
        setShowModal(false);
    };

    const renderSquare = (index) => (
        <button className="square" onClick={() => handleClick(index)}>
            {board[index]}
        </button>
    );

    const handleGameModeChange = (event) => {
        setGameMode(event.target.value);
        resetGame(); 
    };

    return (
        <div className="home">
            <Header />
            <div className="game">
                <h2>Игра в кофе: Крестики-нолики</h2>
                <div className="game-mode">
                    <label>
                        <input
                            type="radio"
                            value="human"
                            checked={gameMode === 'human'}
                            onChange={handleGameModeChange}
                        />
                        Игра с человеком
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="computer"
                            checked={gameMode === 'computer'}
                            onChange={handleGameModeChange}
                        />
                        Игра с компьютером
                    </label>
                </div>
                <div className="board">
                    <div className="row">
                        {renderSquare(0)}
                        {renderSquare(1)}
                        {renderSquare(2)}
                    </div>
                    <div className="row">
                        {renderSquare(3)}
                        {renderSquare(4)}
                        {renderSquare(5)}
                    </div>
                    <div className="row">
                        {renderSquare(6)}
                        {renderSquare(7)}
                        {renderSquare(8)}
                    </div>
                </div>
                {winner && (
                    <div className="status">Победитель: {winner}!</div>
                )}
                {isDraw && (
                    <div className="status">Ничья!</div>
                )}
                <button className="reset-button" onClick={resetGame}>Сбросить игру</button>
            </div>

            {showModal && (
                <div className="modal">
                    < div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>{winner ? `Победитель: ${winner}!` : 'Ничья!'}</h2>
                        <button onClick={resetGame}>Начать заново</button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};


const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export default Home;