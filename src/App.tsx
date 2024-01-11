import React, { useRef, useState } from 'react';
import Header from './components/Header';
import ToDos from './components/ToDos';
import Modal from './components/Modal';
import { CSSTransition } from 'react-transition-group';
import { useAppContext } from './contexts/AppContext/AppContext';

function App() {
    const { modalRef, isModalOpen } = useAppContext();

    return (
        <div className="App">
            <Header />
            <div className="container">
                <ToDos />

                <CSSTransition
                    nodeRef={modalRef}
                    in={isModalOpen}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit>
                    <Modal />
                </CSSTransition>
            </div>
        </div>
    );
}

export default App;
