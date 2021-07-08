import React, { useEffect, useState } from 'react';
import '../styles/game.css';

function Game(props) {
  const size = 9;
  let ban = true;
  let numb = [
    { number: 1, cant: 0 },
    { number: 2, cant: 0 },
    { number: 3, cant: 0 },
    { number: 4, cant: 0 },
    { number: 5, cant: 0 },
    { number: 6, cant: 0 },
    { number: 7, cant: 0 },
    { number: 8, cant: 0 },
    { number: 9, cant: 0 },
  ];

  const [grid, setGrid] = useState(false);
  const [first, setFirst] = useState(true);
  const [lost, setLost] = useState(false);
  const [win, setWin] = useState(false);
  const [current, setCurrent] = useState(false);
  const [numbers, setNumbers] = useState(numb);
  const [errors, setErrors] = useState(0);

  const start = () => {
    let matrix = [];
    let values = [];
    const shifts = [3, 3, 1, 3, 3, 1, 3, 3];
    let lista = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const bigrowshift = [0, 3, 6];
    lista = lista.sort(() => {
      return Math.random() - 0.5;
    });
    for (let i = 0; i < size; i++) {
      values[i] = [];
      for (let j = 0; j < size; j++) {
        values[i][j] = lista[j];
      }
      for (let k = shifts[i]; k < size; k++) {
        lista.push(lista.shift());
      }
    }
    let mat = [...values];

    for (let i = bigrowshift[Math.floor(Math.random() * 3)]; i > 0; i--) {
      mat.push(mat.shift());
    }
    values = [...mat];

    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++)
        matrix[i][j] = {
          x: i,
          y: j,
          content: values[i][j],
          userVal: values[i][j],
        };
    }

    setGrid(matrix);
  };

  const handleRigthClick = (e, col) => {
    e.preventDefault();
    if (col.content !== col.userVal) {
      let x = col.x;
      let y = col.y;
      let copy = [...grid];
      copy[x][y].userVal = '‏‏‎ ‎';
      setGrid(copy);
      console.log(col.content);
    }
  };

  const handleLeftClick = (col) => {
    if (col.content !== col.userVal && current) {
      let x = col.x;
      let y = col.y;
      let copy = [...grid];
      copy[x][y].userVal = current;

      if (copy[x][y].content === current) {
        numb = [...numbers];
        switch (current) {
          case 1:
            numb[0].cant--;
            if (numb[0].cant < 1) setCurrent(false);
            break;
          case 2:
            numb[1].cant--;
            if (numb[1].cant < 1) setCurrent(false);
            break;
          case 3:
            numb[2].cant--;
            if (numb[2].cant < 1) setCurrent(false);
            break;
          case 4:
            numb[3].cant--;
            if (numb[3].cant < 1) setCurrent(false);
            break;
          case 5:
            numb[4].cant--;
            if (numb[4].cant < 1) setCurrent(false);
            break;
          case 6:
            numb[5].cant--;
            if (numb[5].cant < 1) setCurrent(false);
            break;
          case 7:
            numb[6].cant--;
            if (numb[6].cant < 1) setCurrent(false);
            break;
          case 8:
            numb[7].cant--;
            if (numb[7].cant < 1) setCurrent(false);
            break;
          case 9:
            numb[8].cant--;
            if (numb[8].cant < 1) setCurrent(false);
            break;
          default:
        }
        setNumbers(numb);
        endGame(numb);
      } else setErrors(errors + 1);

      setGrid(copy);
    }
  };
  const endGame = (numb) => {
    ban = false;
    if (
      numb[0].cant === 0 &&
      numb[1].cant === 0 &&
      numb[2].cant === 0 &&
      numb[3].cant === 0 &&
      numb[4].cant === 0 &&
      numb[5].cant === 0 &&
      numb[6].cant === 0 &&
      numb[7].cant === 0 &&
      numb[8].cant === 0
    )
      ban = true;

    if (ban) {
      if (errors === 0) setWin(true);
      else setLost(true);
      alert('Game Over');
    }
  };
  const reset = () => {
    props.setDiff(false);
    setGrid(false);
    props.setSelect(false);
    setFirst(true);
    setLost(false);
    setWin(false);
    ban = false;
  };

  useEffect(() => {
    const difficulty = [35, 45, 55, 65];

    if (first && props.select) {
      setFirst(false);
      start();
    }
    if (props.diff && grid) {
      let matrix = [...grid];
      let numb = [...numbers];
      let positions = [];
      let ban = false;

      for (let i = 0; i < difficulty[props.diff]; i++) {
        let x = Math.floor(Math.random() * 9);
        let y = Math.floor(Math.random() * 9);
        do {
          for (let k = 0; k < positions.length; k++)
            if (positions[k].x === x && positions[k].y === y) {
              ban = true;
              x = Math.floor(Math.random() * 9);
              y = Math.floor(Math.random() * 9);
              break;
            } else {
              ban = false;
            }
        } while (ban);

        positions.push({
          x: x,
          y: y,
        });
      }

      for (let i = 0; i < positions.length; i++) {
        switch (matrix[positions[i].x][positions[i].y].userVal) {
          case 1:
            numb[0].cant++;
            break;
          case 2:
            numb[1].cant++;
            break;
          case 3:
            numb[2].cant++;
            break;
          case 4:
            numb[3].cant++;
            break;
          case 5:
            numb[4].cant++;
            break;
          case 6:
            numb[5].cant++;
            break;
          case 7:
            numb[6].cant++;
            break;
          case 8:
            numb[7].cant++;
            break;
          case 9:
            numb[8].cant++;
            break;
          default:
        }
        matrix[positions[i].x][positions[i].y].userVal = '‏‏‎ ‎';
      }
      if (numb) setNumbers(numb);
      if (matrix) setGrid(grid);
      props.setDiff(false);
    }
  }, [props.select, props.diff, first, grid, props, numbers]);

  if (grid)
    return (
      <div className='grid'>
        <div className='centertext'>
          <h5 className='current d-inline-flex'>
            {current ? `Current selection: ${current}` : 'No one selected'}
          </h5>
          <h5 className='errors d-inline-flex'>Errors {errors}</h5>
        </div>

        {grid.map((row, i) => (
          <div key={i}>
            {row.map((col, j) => (
              <div
                key={j}
                className={
                  col.userVal === col.content && current === col.userVal
                    ? 'active d-inline-flex'
                    : col.userVal === '‏‏‎ ‎'
                    ? 'd-inline-flex'
                    : col.userVal !== col.content
                    ? 'wrong d-inline-flex'
                    : 'd-inline-flex'
                }
              >
                <div
                  onClick={() => {
                    handleLeftClick(col);
                  }}
                  onContextMenu={(e) => {
                    handleRigthClick(e, col);
                  }}
                  className={
                    i === 0 && j === 0
                      ? `cont ${col.content} tl`
                      : i === 8 && j === 0
                      ? `cont ${col.content} bl`
                      : i === 0 && j === 8
                      ? `cont ${col.content} tr`
                      : i === 8 && j === 8
                      ? `cont ${col.content} br`
                      : j === 2 || j === 5
                      ? i === 2 || i === 5
                        ? `cont ${col.content} l b`
                        : `cont ${col.content} l `
                      : i === 2 || i === 5
                      ? `cont ${col.content} b`
                      : `cont ${col.content}`
                  }
                >
                  <p className='text-center'>{col.userVal}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div>
          <div className='d-inline-flex nums'>
            {numbers.map((num, j) =>
              num.cant > 0 ? (
                <div
                  className={
                    current === num.number ? 'numsel active' : 'numsel'
                  }
                  key={num.number}
                  onClick={() => setCurrent(num.number)}
                >
                  <p className='text-center'>{num.number}</p>
                </div>
              ) : (
                <div className='numselvac' key={num.number} />
              )
            )}
          </div>
          {lost ? (
            <button className='btn btn-danger res' onClick={() => reset()}>
              Reset
            </button>
          ) : (
            ''
          )}
          {win ? (
            <button className='btn btn-success win' onClick={() => reset()}>
              Reset
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  else return '';
}

export default Game;
