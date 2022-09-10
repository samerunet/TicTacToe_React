import "./App.css";
import { useState } from "react";

function App() {
	const [player, setPlayer] = useState("X");
	const [tiles, setTiles] = useState(Array(9).fill(""));
	const [clicked, setClicked] = useState(false);
	const [winner, setWinner] = useState("");

	const handleTile = (num) => {
		if (tiles[num] !== "") {
			clicked ? setClicked(false) : setClicked(true);
			return;
		}
		let tileFilled = [...tiles];

		if (player === "X") {
			tileFilled[num] = "X";
			setPlayer("O");
		} else {
			tileFilled[num] = "O";
			setPlayer("X");
		}

		setTiles(tileFilled);
		console.log(tileFilled);
		gameLogic(tileFilled);
	};

	const handleRestart = () => {
		setTiles(Array(9).fill(""));
		setWinner("");
	};

	const Tile = ({ num }) => {
		return (
			<div onClick={() => handleTile(num)} className={`board-tile  `}>
				{tiles[num]}
			</div>
		);
	};

	const gameLogic = (tileFilled) => {
		let situations = {
			across: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			],
			down: [
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
			],
			diagonal: [
				[0, 4, 8],
				[2, 4, 6],
			],
		};
		for (let situation in situations) {
			situations[situation].forEach((s) => {
				if (tiles[s[0]] === "" || tiles[s[1]] === "" || tiles[s[2]] === "") {
					return;
				} else if (tiles[s[0]] === tiles[s[1]] && tiles[s[1]] === tiles[s[2]]) {
					setWinner(`Winner is ${tiles[s[0]]}`);
				}
			});
		}
	};

	return (
		<div className='App'>
			<div className='wrapper'>
				<div className='left'>
					<div className='title'>
						<h1>
							Tic-Tac-Toe <br />
							Game
						</h1>
						<div onClick={() => handleRestart()} className='restart'>
							Start New Game
						</div>
					</div>
				</div>
				<div className='right'>
					<div className='game'>
						<div className='header'>
							<div className='playerX'>
								<span>Player {player}</span>
							</div>
							<div className='playerO'>
								<span>{winner}</span>
							</div>
						</div>
						<div className='board'>
							<Tile num={0} />
							<Tile num={1} />
							<Tile num={2} />
							<Tile num={3} />
							<Tile num={4} />
							<Tile num={5} />
							<Tile num={6} />
							<Tile num={7} />
							<Tile num={8} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
