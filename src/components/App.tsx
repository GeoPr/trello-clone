import React, { useEffect } from 'react';
import { CreateBoard } from './CreateBoard/CreateBoard';
import { Boards } from './Boards/Boards';
import { useSelector } from 'react-redux';
import { TApp } from '../redux/store';
import './App.scss';

const App: React.FC = () => {
  const boards = useSelector((s: TApp) => s.boards);

  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);

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
