import './App.css';
import StatusPanel from './StatusPanel';
import ControlPanel from './ControlPanel';
import RosConnection from './RosConnection';

function App() {
  const {position, connected, publishPoint} = RosConnection();

  return (
    <div className="App">
      <header className="App-header">

        <StatusPanel position={position} connected={connected} />

        <ControlPanel publishPoint={publishPoint} />

      </header>
    </div>
  );
}

export default App;