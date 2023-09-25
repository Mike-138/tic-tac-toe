const gameBoard = ((gridElement, victoryPanelElement) => {

    const _cellArray = [[null, null, null], [null, null, null], [null, null, null]]

    const _columnWinner = () => {
        let columnValues = new Set();
        for (let i = 0; i < 3; i++) {
            columnValues.clear();
            for (let j = 0; j < 3; j++) {
                columnValues.add(_cellArray[i][j]);
            }
            if (columnValues.size === 1 && !columnValues.has(null)) {
                return [columnValues];
            }
        return null;
        }
    }

    const _rowWinner = () => {
        let rowValues = new Set();
        for (let i = 0; i < 3; i++) {
            rowValues.clear();
            for (let j = 0; j < 3; j++) {
                rowValues.add(_cellArray[j][i]);
            }
            if (rowValues.size === 1 && !rowValues.has(null)) {
                return [rowValues];
            }
        return null;
        }
    }

    const _forwardDiagonalWinner = () => {
        let forwardDiagonalValues = new Set();
        for (let i = 0; i < 3; i++) {
            forwardDiagonalValues.add(_cellArray[i][i]);
        }
        if (forwardDiagonalValues.size === 1 && !forwardDiagonalValues.has(null)) {
            return [forwardDiagonalValues];
        }
        return null;
    }

    const _backwardDiagonalWinner = () => {
        let backwardDiagonalValues = new Set();
        for (let i = 0; i < 3; i++) {
            backwardDiagonalValues.add(_cellArray[i][2 - i]);
        }
        if (backwardDiagonalValues.size === 1 && !backwardDiagonalValues.has(null)) {
            return [backwardDiagonalValues];
        }
        return null;
    }

    const _determineWinner = () => _columnWinner() || _rowWinner() || _forwardDiagonalWinner() || _backwardDiagonalWinner();

    const _displayWinner = (winner) => `${winner} wins!`;

    const _checkWinner = (victoryPanelElement) => {
        let winner = _determineWinner();
        if (winner) {
            victoryPanelElement.textContent = _displayWinner(winner);
        }
        return;
    }

    gridElement.addEventListener("click", (event) => {
        console.log(event.target);
    })

})(document.querySelector(".game-board"), null);