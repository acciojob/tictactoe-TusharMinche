//your JS code here. If required.
function isGameOver(matrix) {
      // Row check
      for (let i = 0; i < 3; i++) {
        if (
          matrix[i][0] === matrix[i][1] &&
          matrix[i][1] === matrix[i][2] &&
          (matrix[i][0] === 1 || matrix[i][0] === 0)
        ) {
          return true;
        }
      }

      // Column check
      for (let i = 0; i < 3; i++) {
        if (
          matrix[0][i] === matrix[1][i] &&
          matrix[1][i] === matrix[2][i] &&
          (matrix[0][i] === 1 || matrix[0][i] === 0)
        ) {
          return true;
        }
      }

      // Diagonal checks
      if (
        matrix[0][0] === matrix[1][1] &&
        matrix[1][1] === matrix[2][2] &&
        (matrix[0][0] === 1 || matrix[0][0] === 0)
      )
        return true;

      if (
        matrix[0][2] === matrix[1][1] &&
        matrix[1][1] === matrix[2][0] &&
        (matrix[0][2] === 1 || matrix[0][2] === 0)
      )
        return true;

      return false;
    }

    function isDraw(matrix) {
      return matrix.flat().every((cell) => cell === 0 || cell === 1);
    }

    function gameOn(event) {
      event.preventDefault();

      document.getElementById("myForm").style.display = "none";

      const player1 = document.getElementById("player1").value;
      const player2 = document.getElementById("player2").value;
      let turn = player1;

      document.querySelector(".grid-container").style.visibility = "visible";
      document.querySelector(".message").textContent = `${turn}, you're up`;

      let matrix = [
        [10, 20, 30],
        [40, 50, 60],
        [70, 80, 90],
      ];

      for (let i = 1; i <= 9; i++) {
        document.getElementById(`grid${i}`).addEventListener("click", () => {
          const cell = document.getElementById(`grid${i}`);
          if (cell.innerHTML !== "") return;

          if (i <= 3) {
            matrix[0][i - 1] = turn === player1 ? 1 : 0;
          } else if (i <= 6) {
            matrix[1][i - 4] = turn === player1 ? 1 : 0;
          } else {
            matrix[2][i - 7] = turn === player1 ? 1 : 0;
          }

          cell.innerHTML = turn === player1 ? "X" : "O";

          if (isGameOver(matrix)) {
            document.querySelector(
              ".message"
            ).textContent = `${turn}, congratulations you won!`;
            disableBoard();
          } else if (isDraw(matrix)) {
            document.querySelector(".message").textContent = "It's a draw!";
          } else {
            turn = turn === player1 ? player2 : player1;
            document.querySelector(".message").textContent = `${turn}, you're up`;
          }
        });
      }
    }

    function disableBoard() {
      for (let i = 1; i <= 9; i++) {
        document.getElementById(`grid${i}`).style.pointerEvents = "none";
      }
    }

    window.onload = function () {
      document.getElementById("myForm").onsubmit = gameOn;
    };