import { useState, useEffect, useRef } from 'react';
import ROSLIB from 'roslib';

const ROS_URL = 'ws://192.168.11.65:9090';
const sub_topic = '/to_wpc';
const pub_topic = '/from_wpc';

function RosConnection() {
  const rosRef = useRef(null);
  const reconnectTimer = useRef(null);

  const subRef = useRef(null);
  const pubRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, r: 0 });

  useEffect(() => {
    const connect = () => {
      const ros = new ROSLIB.Ros({ url: ROS_URL });
      rosRef.current = ros;

      const sub = new ROSLIB.Topic({
        ros: ros,
        name: sub_topic,
        messageType: 'geometry_msgs/Point'
      });

      const pub = new ROSLIB.Topic({
        ros: ros,
        name: pub_topic,
        messageType: 'geometry_msgs/Point'
      });

      subRef.current = sub;
      pubRef.current = pub;

      const callback = (msg) => {
        setPosition({
          x: msg.x,
          y: msg.y,
          r: msg.z
        });
      };

      ros.on('connection', () => {
        console.log('✅ Connected');
        setConnected(true);
        sub.subscribe(callback);
      });

      ros.on('error', (err) => {
        console.log('❌ Error:', err);
      });

      ros.on('close', () => {
        console.log('🔌 Reconnecting...');
        setConnected(false);

        reconnectTimer.current = setTimeout(connect, 3000);
      });
    };

    connect();

    return () => {
      if (rosRef.current) rosRef.current.close();
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
    };
  }, []);

  const publishPoint = (x, y, z) => {
    if (!connected || !pubRef.current) return;

    const msg = new ROSLIB.Message({ x, y, z });
    pubRef.current.publish(msg);
  };

  return {
    position,
    connected,
    publishPoint
  };
}

export default RosConnection;