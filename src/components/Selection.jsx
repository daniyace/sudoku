import React from 'react';
import '../styles/selection.css';

const Selection = (props) => {
  return (
    <div className='selection container'>
      <header>
        <h1 className='text-center'>Sudoku on React</h1>
      </header>
      <section>
        <h3 className='text-center par'>Choose the difficulty</h3>
        <div className='center'>
          <select name='diff' id='diff' className='select' defaultValue={1}>
            <option value={0}>Easy</option>
            <option value={1}>Normal</option>
            <option value={2}>Hard</option>
            <option value={3}>You cant win</option>
          </select>
          <button
            className='btn btn-primary '
            onClick={() => {
              let e = document.getElementById('diff');
              props.setDiff(e.value);
              props.setSelect(true);
            }}
          >
            Start
          </button>
        </div>
      </section>
    </div>
  );
};

export default Selection;
