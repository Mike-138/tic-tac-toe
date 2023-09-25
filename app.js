const gameBoard = (() => {

    const _cellArray = [[null, null, null], [null, null, null], [null, null, null]]
    let _turnNumber = 1;

    const _grid = document.querySelector(".game-board");

    const _opponentSelector = document.getElementById("opponent-selector");
    const _opponentConfirmation = document.getElementById("opponent-confirmation");
    const _computerOpponent = document.getElementById("computer");
    const _humanOpponent = document.getElementById("human");

    const _markerSelector = document.getElementById("marker-selector");
    const _markerConfirmation = document.getElementById("marker-confirmation");
    const _xMarker = document.getElementById("x-marker");
    const _oMarker = document.getElementById("o-marker");

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

    const _getMarker = () => {
        return _turnNumber % 2 ? ["x.svg", "X"] : ["o.svg", "O"];
    }

    const _configureMarkers = () => {
        _markerConfirmation.addEventListener("click", _setSubmitValueByRadioPair.bind(this, _markerConfirmation, _xMarker, _oMarker));
    }

    _grid.addEventListener("click", (event) => {
        let [markerSrc, markerAlt] = _getMarker();
        let cell = event.target;
        if (cell.className === "game-cell" && cell.firstChild.alt === "EMPTY") {
            cellMarker = cell.firstChild;
            cellMarker.src = markerSrc;
            cellMarker.alt = markerAlt;
            _turnNumber += 1;
        }
    })

    const _setSubmitValueByRadioPair = (submitButton, radioOne, radioTwo) => {
        radioOne.checked ? submitButton.value = radioOne.id : submitButton.value = radioTwo.id;
    }

    _opponentConfirmation.addEventListener("click", _setSubmitValueByRadioPair.bind(this, _opponentConfirmation, _computerOpponent, _humanOpponent));

    _markerSelector.showModal();

})();