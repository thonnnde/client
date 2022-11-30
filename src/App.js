 /* global google*/
import './App.css';
import "bootswatch/dist/solar/bootstrap.min.css";
import RouteUI from "./containers/RouteUIContainer"
import PersonalPage from './components/PersonalPage';

function App() {
  return (
    <div className="App" style={{height:'100%', weight:'100%'}}>
      <RouteUI></RouteUI>
    </div>
  );
}

export default App;
