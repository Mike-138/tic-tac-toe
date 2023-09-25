const TicTacToe = ((grid) => {

    const _cellArray = [[null, null, null], [null, null, null], [null, null, null]]

    const _isValidColumn = () => {
        let columnValues = new Set();
        for (let i = 0; i < 3; i++) {
            columnValues.clear();
            for (let j = 0; j < 3; j++) {
                columnValues.add(this._cellArray[i][j]);
            }
            if (columnValues.size === 1 && !columnValues.has(null)) {
                return [columnValues];
            }
        return null;
        }
    }

    const isValidRow = () => {
        let rowValues = new Set();
        for (let i = 0; i < 3; i++) {
            rowValues.clear();
            for (let j = 0; j < 3; j++) {
                rowValues.add(this._cellArray[j][i]);
            }
            if (rowValues.size === 1 && !rowValues.has(null)) {
                return [rowValues];
            }
        return null;
        }
    }

    const _isValidForwardDiagonal = () => {
        let forwardDiagonalValues = new Set();
        for (let i = 0; i < 3; i++) {
            forwardDiagonalValues.add(this._cellArray[i][i]);
        }
        if (forwardDiagonalValues.size === 1 && !forwardDiagonalValues.has(null)) {
            return [forwardDiagonalValues];
        }
        return null;
    }

    const _isValidBackwardDiagonal = () => {
        let backwarDiagonalValues = new Set();
        for (let i = 0; i < 3; i++) {
            backwarDiagonalValues.add(this._cellArray[i][2 - i]);
        }
        if (backwarDiagonalValues.size === 1 && !backwarDiagonalValues.has(null)) {
            return [backwarDiagonalValues];
        }
        return null;
    }
})