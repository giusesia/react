function Square(props) {
  return /*#__PURE__*/(
    React.createElement("button", { className: "square", onClick: props.onClick },
    props.value));


}

class Board extends React.Component {
  renderSquare(i) {
    return /*#__PURE__*/(
      React.createElement(Square, {
        value: this.props.squares[i],
        onClick: () => this.props.onClick(i) }));


  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "board-row" },
      this.renderSquare(0),
      this.renderSquare(1),
      this.renderSquare(2), /*#__PURE__*/
      this.renderSquare(3)),
      React.createElement("div", { className: "board-row" },
      this.renderSquare(4),
      this.renderSquare(5),
      this.renderSquare(6), /*#__PURE__*/
	  this.renderSquare(7)),
	  React.createElement("div", { className: "board-row" },
      this.renderSquare(8),
      this.renderSquare(9),
      this.renderSquare(10), /*#__PURE__*/
      this.renderSquare(11)),
      React.createElement("div", { className: "board-row" },
      this.renderSquare(12),
      this.renderSquare(13),
	  this.renderSquare(14),
      this.renderSquare(15))));



  }}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
      {
        squares: Array(16).fill(null) }],


      stepNumber: 0,
      xIsNext: true };

  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
      {
        squares: squares }]),


      stepNumber: history.length,
      xIsNext: !this.state.xIsNext });

  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0 });

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
      'Fai La mossa #' + move :
      'Inizia a Giocare';
      return /*#__PURE__*/(
        React.createElement("li", { key: move }, /*#__PURE__*/
        React.createElement("button", { onClick: () => this.jumpTo(move) }, desc)));


    });

    let status;
    if (winner) {
      status = "Il Vincitore è: " + winner;
    } else {
      status = "Prossimo Giocatore: " + (this.state.xIsNext ? "X" : "O");
    }

    return /*#__PURE__*/(
      React.createElement("div", { className: "game" }, /*#__PURE__*/
      React.createElement("div", { className: "game-board" }, /*#__PURE__*/
      React.createElement(Board, {
        squares: current.squares,
        onClick: i => this.handleClick(i) })), /*#__PURE__*/


      React.createElement("div", { className: "game-info" }, /*#__PURE__*/
      React.createElement("div", null, status), /*#__PURE__*/
      React.createElement("ol", null, moves))));



  }}


// ========================================

ReactDOM.render( /*#__PURE__*/React.createElement(Game, null), document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15]];


  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}