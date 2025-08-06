function gameOn(event) {
  event.preventDefault();

  document.getElementById("myForm").style.display = "none";

  const player1 = document.getElementById("player1").value;
  const player2 = document.getElementById("player2").value;
  let turn = player1;

  document.querySelector(".grid-container").style.visibility = "visible";
  document.querySelector(".message").textContent = `${turn} you're up`;

  let matrix = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90],
  ];

  for (let i = 1; i <= 9; i++) {
    document.getElementById(`${i}`).addEventListener("click", () => {
      const cell = document.getElementById(`${i}`);
      if (cell.innerHTML !== "") return;

      if (i <= 3) matrix[0][i - 1] = turn === player1 ? 1 : 0;
      else if (i <= 6) matrix[1][i - 4] = turn === player1 ? 1 : 0;
      else matrix[2][i - 7] = turn === player1 ? 1 : 0;

      cell.innerHTML = turn === player1 ? "x" : "o"; // lowercase for test match

      if (isGameOver(matrix)) {
        document.querySelector(".message").textContent = `${turn} congratulations you won!`;
        disableBoard();
      } else if (isDraw(matrix)) {
        document.querySelector(".message").textContent = "It's a draw!";
      } else {
        turn = turn === player1 ? player2 : player1;
        document.querySelector(".message").textContent = `${turn} you're up`;
      }
    });
  }
}
