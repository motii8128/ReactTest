import './App.css';
import ROSLIB from 'roslib';
import { useState , useEffect} from 'react';

const ros = new ROSLIB.Ros({
  url: 'ws://192.168.11.12:9090'
});

const sub_current = new ROSLIB.Topic({
    ros : ros,
    name : '/to_wpc',
    messageType : 'geometry_msgs/Point'
});

const pub_target = new ROSLIB.Topic({
    ros : ros,
    name : '/from_wpc',
    messageType : 'geometry_msgs/Point'
});

function CurrentView()
{
  const [cur_pos, setPosition] = useState({x:0.0, y:0.0, r : 0.0});

  useEffect(()=>{
    sub_current.subscribe((msg)=>{
      setPosition({
        x: msg.x,
        y: msg.y,
        r: msg.z
      });
    });

    return () =>{
      sub_current.unsubscribe();
    };
  }, []);

  return(
    <div>
      <p style={{ fontSize: "48px" }}>Great Hako Date</p>
      <p>x:{cur_pos.x}</p>
      <p>y:{cur_pos.y}</p>
      <p>rotation:{cur_pos.r}</p>
    </div>
  );
  
}

function TargetPublisher()
{
  const send = () =>{
    const msg = new ROSLIB.Message({
        x : 1.0,
        y : 0.0,
        z : 0.0
    });

    pub_target.publish(msg);
  };

  const stop = () =>{
    const msg = new ROSLIB.Message({
        x : -1.0,
        y : 0.0,
        z : 0.0
    });
    pub_target.publish(msg);
  }


  const Click = () => {
      send();
  }

  const StopClick = () => {
      stop();
  }

  return(
    <div>
      <p></p>
      <button onClick={Click} style={{
          fontSize: '24px', 
          padding: '40px 80px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer', }}>Start</button>
      <button onClick={StopClick} style={{
          fontSize: '24px', 
          padding: '40px 80px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer', 
          marginLeft: '20px'}}>Stop</button>

    </div>
  );
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
            <CurrentView />
            <TargetPublisher />
      </header>
    </div>
  );
}



export default App;
