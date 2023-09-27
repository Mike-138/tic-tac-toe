const gameBoard = (() => {

    let _grid = [[null, null, null], [null, null, null], [null, null, null]]
    let turn = 1;

    const resetGrid = () => _grid = [[null, null, null], [null, null, null], [null, null, null]];

    const setSquare = (cell, value) => {
        _grid[Number(cell.dataset.row)][Number(cell.dataset.col)] = value;
    }

    const _checkRowWin = () => {
        console.log(_grid);
        let rowValues = new Set();
        for (let i = 0; i < 3; i++) {
            rowValues.clear();
            for (let j = 0; j < 3; j++) {
                rowValues.add(_grid[i][j]);
            }
            if (rowValues.size === 1 && !(rowValues.has(null))) {
                return [...rowValues].pop();
            }
        }
        return null;
    }

    const _checkColumnWin = () => {
        let columnValues = new Set();
        for (let i = 0; i < 3; i++) {
            columnValues.clear();
            for (let j = 0; j < 3; j++) {
                columnValues.add(_grid[j][i]);
            }
            if (columnValues.size === 1 && !columnValues.has(null)) {
                return [...columnValues].pop();
            }
        }
        return null;
    }

    const _checkForwardDiagonalWin = () => {
        let forwardDiagonalValues = new Set();
        for (let i = 0; i < 3; i++) {
            forwardDiagonalValues.add(_grid[i][i]);
        }
        if (forwardDiagonalValues.size === 1 && !forwardDiagonalValues.has(null)) {
            return [...forwardDiagonalValues].pop();
        }
        return null;
    }

    const _checkBackwardDiagonalWin = () => {
        let backwardDiagonalValues = new Set();
        for (let i = 0; i < 3; i++) {
            backwardDiagonalValues.add(_grid[i][2 - i]);
        }
        if (backwardDiagonalValues.size === 1 && !backwardDiagonalValues.has(null)) {
            return [...backwardDiagonalValues].pop();
        }
        return null;
    }

    const _checkDraw = () => {
        for (let i = 0; i < 3; i++) {
            if (_grid[i].some((element) => element === null)) {
                return null;
            }
        }
        return "Draw";
    }

    const checkResult = () => _checkRowWin() || _checkColumnWin() || _checkForwardDiagonalWin() || _checkBackwardDiagonalWin() || _checkDraw();

    const _computerChoice = () => {
        let row;
        let col;
        do {
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 3);
        } while (_grid[row][col]);
        let [markerSrc, markerAlt] = _getMarker();
        let cellMarker = document.querySelector(`[data-col="${col}"][data-row="${row}"] img`)
        cellMarker.src = markerSrc;
        cellMarker.alt = markerAlt;
        _grid[row][col] = markerAlt;
        let result = checkResult();
        if (result) {
            displayResult(result);
        }
        turn += 1;
    }

    return {turn, resetGrid, setSquare, checkResult};

})();

const gameController = (() => {

    const endGame = () => {
        let result = gameBoard.checkResult();
        console.log(result);
        if (result) {
            displayController.displayResult(result);
        }
    }

    return {endGame};

})();

const displayController = (() => {

    const _board = document.querySelector(".game-board");

    const _opponentSelector = document.getElementById("opponent-selector");
    const _opponentConfirmation = document.getElementById("opponent-confirmation");
    const _computerOpponent = document.getElementById("computer");
    const _humanOpponent = document.getElementById("human");

    const _markerSelector = document.getElementById("marker-selector");
    const _markerConfirmation = document.getElementById("marker-confirmation");
    const _xMarker = document.getElementById("x-marker");
    const _oMarker = document.getElementById("o-marker");

    const _resultModal = document.getElementById("result-modal");
    const _restartButton = document.getElementById("restart-button");
    const _result = document.getElementById("result");

    const _setSubmitValueByRadioPair = (submitButton, radioOne, radioTwo) => {
        radioOne.checked ? submitButton.value = radioOne.id : submitButton.value = radioTwo.id;
    }

    const _getMarker = () => {
        return gameBoard.turn % 2 ? ["x.svg", "X"] : ["o.svg", "O"];
    }

    const displayResult = (result) => {
        switch (result) {
            case "X":
                _result.textContent = "X wins!";
                break;
            case "O":
                _result.textContent = "O wins!";
                break;
            case "Draw":
                _result.textContent = "Draw!";
                break;
            default:
                _result.textContent = "Error";
        }
        _resultModal.showModal();
    }

    _board.addEventListener("click", (event) => {
        let cell = event.target;
        let cellMarker = cell.firstChild;
        if (cell.className === "game-cell" && cellMarker.alt === "EMPTY") {
            let [markerSrc, markerAlt] = _getMarker();
            cellMarker.src = markerSrc;
            cellMarker.alt = markerAlt;
            gameBoard.setSquare(cell, markerAlt);
            gameController.endGame()
            gameBoard.turn += 1;
        }
    })

    _opponentConfirmation.addEventListener("click", _setSubmitValueByRadioPair.bind(this, _opponentConfirmation, _computerOpponent, _humanOpponent));
    _opponentSelector.addEventListener("close", () => _markerSelector.showModal());

    _markerConfirmation.addEventListener("click", _setSubmitValueByRadioPair.bind(this, _markerConfirmation, _xMarker, _oMarker));
    _markerSelector.addEventListener("close", () => _markerSelector.returnValue === "x-marker" ? gameBoard.turn = 1 : gameBoard.turn = 2);

    _restartButton.addEventListener("click", () => {
        gameBoard.resetGrid()
        gameBoard.turn = 1;
        let cells = _board.children;
        for (let cell of cells) {
            cellMarker = cell.firstChild;
            cellMarker.src = "";
            cellMarker.alt = "EMPTY";
        }
    })

    _opponentSelector.showModal();

    return {displayResult};

})();