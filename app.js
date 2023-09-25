const gameBoard = (() => {

    const _grid = [[null, null, null], [null, null, null], [null, null, null]]
    let _turnNumber = 1;

    const _board = document.querySelector(".game-board");

    const _opponentSelector = document.getElementById("opponent-selector");
    const _opponentConfirmation = document.getElementById("opponent-confirmation");
    const _computerOpponent = document.getElementById("computer");
    const _humanOpponent = document.getElementById("human");

    const _markerSelector = document.getElementById("marker-selector");
    const _markerConfirmation = document.getElementById("marker-confirmation");
    const _xMarker = document.getElementById("x-marker");
    const _oMarker = document.getElementById("o-marker");

    const _rowWinner = () => {
        let columnValues = new Set();
        for (let i = 0; i < 3; i++) {
            columnValues.clear();
            for (let j = 0; j < 3; j++) {
                columnValues.add(_grid[i][j]);
            }
            if (columnValues.size === 1 && !columnValues.has(null)) {
                return [columnValues];
            }
        return null;
        }
    }

    const _columnWinner = () => {
        let rowValues = new Set();
        for (let i = 0; i < 3; i++) {
            rowValues.clear();
            for (let j = 0; j < 3; j++) {
                rowValues.add(_grid[j][i]);
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
            forwardDiagonalValues.add(_grid[i][i]);
        }
        if (forwardDiagonalValues.size === 1 && !forwardDiagonalValues.has(null)) {
            return [forwardDiagonalValues];
        }
        return null;
    }

    const _backwardDiagonalWinner = () => {
        let backwardDiagonalValues = new Set();
        for (let i = 0; i < 3; i++) {
            backwardDiagonalValues.add(_grid[i][2 - i]);
        }
        if (backwardDiagonalValues.size === 1 && !backwardDiagonalValues.has(null)) {
            return [backwardDiagonalValues];
        }
        return null;
    }

    const _determineWinner = () => _rowWinner() || _columnWinner() || _forwardDiagonalWinner() || _backwardDiagonalWinner();

    const _displayWinner = (winner) => `${winner} wins!`;

    const _checkWinner = (victoryPanelElement) => {
        let winner = _determineWinner();
        if (winner) {
            victoryPanelElement.textContent = _displayWinner(winner);
        }
        return;
    }

    const _getMarker = () => {
        return _turnNumber % 2 ? ["x.svg", "X"] : ["o.svg", "O"];
    }

    const _configureMarkers = () => {
        _markerConfirmation.addEventListener("click", _setSubmitValueByRadioPair.bind(this, _markerConfirmation, _xMarker, _oMarker));
    }

    _board.addEventListener("click", (event) => {
        let cell = event.target;
        let cellMarker = cell.firstChild;
        if (cell.className === "game-cell" && cellMarker.alt === "EMPTY") {
            let [markerSrc, markerAlt] = _getMarker();
            cellMarker.src = markerSrc;
            cellMarker.alt = markerAlt;
            _grid[Number(cell.dataset.row)][Number(cell.dataset.col)] = markerAlt;
            _turnNumber += 1;
        }
    })

    const _setSubmitValueByRadioPair = (submitButton, radioOne, radioTwo) => {
        radioOne.checked ? submitButton.value = radioOne.id : submitButton.value = radioTwo.id;
    }

    _opponentConfirmation.addEventListener("click", _setSubmitValueByRadioPair.bind(this, _opponentConfirmation, _computerOpponent, _humanOpponent));

    _markerSelector.showModal();

})();