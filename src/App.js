import logo from './chipmit-logo.png';
import './App.css';
import ImageSlider from './ImageSlider';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="Title">
          Coming Soon
        </p>
        <ImageSlider />
      </header>
    </div>
  );
}

export default App;
