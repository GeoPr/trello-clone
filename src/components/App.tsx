import React from 'react';
import { CreateBoard } from './CreateBoard/CreateBoard';
import { Boards } from './Boards/Boards';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <main className="page">
        <section className="page__sc sc">
          <div className="sc__container _container">
            <div className="sc__body">
              <CreateBoard />
              <Boards />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
