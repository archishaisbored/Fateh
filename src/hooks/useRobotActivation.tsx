import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket;

export function useRobotActivation() {
  const [isActivated, setIsActivated] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [showConsole, setShowConsole] = useState(false);

  useEffect(() => {
    socket = io('https://fateh-2.onrender.com'); // your Render server

    socket.on('connect', () => {
      console.log('✅ Connected to socket for activation');
    });

    socket.on('robot_wakeup', () => {
      console.log('👁️ Robot Wakeup signal received!');
      setIsActivated(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Eye opening and console display (only after activated)
  useEffect(() => {
    if (isActivated) {
      const leftEyeTimer = setTimeout(() => {
        setIsEyeOpen(true);
      }, 1000);

      const consoleTimer = setTimeout(() => {
        setShowConsole(true);
      }, 4000);

      return () => {
        clearTimeout(leftEyeTimer);
        clearTimeout(consoleTimer);
      };
    }
  }, [isActivated]);

  return { isActivated, isEyeOpen, showConsole };
}
