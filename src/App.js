import './App.css';
import "bootswatch/dist/flatly/bootstrap.min.css";
import KanBan from './components/KanBan';

function App() {
  return (
    <div className="App" style={{height:'100%', weight:'100%'}}>
      <KanBan/>
    </div>
  );
}

export default App;
