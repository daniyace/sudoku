import React, { useState } from 'react';
import Game from './components/Game';
import Selection from './components/Selection';

function App() {
  const [diff, setDiff] = useState(false);
  const [select, setSelect] = useState(false);
  return (
    <div className='container'>
      {!select ? (
        <Selection setSelect={setSelect} setDiff={setDiff} />
      ) : (
        <Game
          diff={diff}
          select={select}
          setSelect={setSelect}
          setDiff={setDiff}
        />
      )}
    </div>
  );
}

export default App;
