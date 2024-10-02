const board = ['', '', '', '', '', '', '', '', ''];
const cells = document.querySelectorAll('.cell');

const checkWin = (player) => {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // горизонтальные
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // вертикальные
        [0, 4, 8], [2, 4, 6]              // диагональные
    ];
    return winCombinations.some(combo => 
        combo.every(index => board[index] === player)
    );
};

const checkDraw = () => {
    return board.every(cell => cell !== '');
};

const botMove = () => {
    // 1. Проверка на возможность выиграть
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            if (checkWin('O')) {
                renderBoard();
                return;
            }
            board[i] = '';  // Откат хода
        }
    }

    // 2. Проверка на необходимость блокировать игрока
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'X';
            if (checkWin('X')) {
                board[i] = 'O';
                renderBoard();
                return;
            }
            board[i] = '';  // Откат хода
        }
    }

    // 3. Ход в центр
    if (board[4] === '') {
        board[4] = 'O';
        renderBoard();
        return;
    }

    // 4. Ход в угол
    const corners = [0, 2, 6, 8];
    for (let i of corners) {
        if (board[i] === '') {
            board[i] = 'O';
            renderBoard();
            return;
        }
    }

    // 5. Ход в любую оставшуюся ячейку
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            renderBoard();
            return;
        }
    }
};

const playerMove = (index) => {
    if (board[index] === '') {
        board[index] = 'X';
        renderBoard();
        if (checkWin('X')) {
            setTimeout(() => alert('Вы выиграли!'), 100);
            return;
        } else if (checkDraw()) {
            setTimeout(() => alert('Ничья!'), 100);
            return;
        }
        botMove();
        if (checkWin('O')) {
            setTimeout(() => alert('Бот выиграл!'), 100);
        } else if (checkDraw()) {
            setTimeout(() => alert('Ничья!'), 100);
        }
    }
};

const renderBoard = () => {
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
};

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        playerMove(index);
    });
});