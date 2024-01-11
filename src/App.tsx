import React from 'react';
import Header from './components/Header';
import ToDos from './components/ToDos';

function App() {
    return (
        <div className="App">
            <div className="container">
                <Header />
                <ToDos />
            </div>
        </div>
    );
}

export default App;
