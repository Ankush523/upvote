import logo from './logo.svg';
import './App.css';
import SmartWallet from './components/SmartWallet';
import SCW from './components/SCW';
import Gasless from './components/Gasless';

function App() {
  return (
    <div className="App">
      {/* <SmartWallet/> */}
      <Gasless/>
      <SCW/>
    </div>
  );
}

export default App;
