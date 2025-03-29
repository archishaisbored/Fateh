import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import RobotEye from '@/components/RobotEye';
import ConsoleHeader from '@/components/ConsoleHeader';
import DroneFeed from '@/components/DroneFeed';
import RobotSpeech from '@/components/RobotSpeech';
import ConsoleFooter from '@/components/ConsoleFooter';
import FullScreenToggle from '@/components/FullScreenToggle';

const Index = () => {
  const [showConsole, setShowConsole] = useState(false);
  const [isDroneFullScreen, setIsDroneFullScreen] = useState(false);
  const [isCaptionFullScreen, setIsCaptionFullScreen] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(true);

  useEffect(() => {
    const socket = io("https://fateh-2.onrender.com", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("✅ Frontend connected to Socket.IO");
    });
    socket.on("robot_wakeup", (data) => {
      console.log("👁 Wakeup received from robot", data);
      setIsEyeOpen(true);
      setTimeout(() => setShowConsole(true), 2000);
    });
    
    

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleToggleDroneFullScreen = () => {
    setIsDroneFullScreen(!isDroneFullScreen);
    if (!isDroneFullScreen) {
      setIsCaptionFullScreen(false);
    }
  };

  const handleToggleCaptionFullScreen = () => {
    setIsCaptionFullScreen(!isCaptionFullScreen);
    if (!isCaptionFullScreen) {
      setIsDroneFullScreen(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-robot-dark p-0 flex items-center justify-center">
      {/* Initial robot eye activation stage */}
      <div className="fixed inset-0 flex items-center justify-center z-10">
  <RobotEye isOpen={isEyeOpen} />
</div>


      {/* Full screen toggle buttons */}
      {showConsole && (
        <FullScreenToggle
          isDroneFullScreen={isDroneFullScreen}
          isCaptionFullScreen={isCaptionFullScreen}
          onToggleDroneFullScreen={handleToggleDroneFullScreen}
          onToggleCaptionFullScreen={handleToggleCaptionFullScreen}
        />
      )}

      {/* Main content */}
      <div className="max-w-7xl w-full mx-auto">
        {isDroneFullScreen ? (
          <div className="w-full h-screen">
            <DroneFeed isActive={showConsole} isFullScreen={true} />
          </div>
        ) : (
          <div className={`w-full transition-opacity duration-1000 ease-in-out ${showConsole ? 'opacity-100' : 'opacity-0'}`}>
            <ConsoleHeader title="Disaster Management Console" isOnline={showConsole} />

            <div className={`grid ${isCaptionFullScreen ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-4 mt-4 p-4`}>
              {(!isDroneFullScreen || isCaptionFullScreen) && (
                <div className={`${isCaptionFullScreen ? 'col-span-full h-[80vh]' : 'md:col-span-1 h-[500px]'} transition-all duration-300`}>
                  <RobotSpeech isActive={showConsole} />
                </div>
              )}

              {(!isCaptionFullScreen || isDroneFullScreen) && (
                <div className="md:col-span-2 h-[500px] transition-all duration-300">
                  <DroneFeed isActive={showConsole} />
                </div>
              )}
            </div>

            <ConsoleFooter isActive={showConsole} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
