import React, { useRef, useState } from 'react';
import Header from './components/Header';
import ToDos from './components/ToDos';
import Modal from './components/Modal';
import { CSSTransition } from 'react-transition-group';

function App() {
    const modalRef = useRef(null);
    const [isModalShow, setIsModalShow] = useState(false);

    const handleCloseModal = () => {
        console.log('CLOSE');
        setIsModalShow(false);
    };
    const handleOpenModal = () => {
        console.log('OPEN');
        setIsModalShow(true);
    };

    return (
        <div className="App">
            <div className="container">
                <Header handleOpenModal={handleOpenModal} />
                <ToDos />

                <CSSTransition
                    nodeRef={modalRef}
                    in={isModalShow}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit>
                    <Modal modalRef={modalRef} handleClose={handleCloseModal} />
                </CSSTransition>
            </div>
        </div>
    );
}

export default App;
