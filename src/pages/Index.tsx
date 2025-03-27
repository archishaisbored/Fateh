
import React, { useState } from 'react';
import RobotEye from '@/components/RobotEye';
import ConsoleHeader from '@/components/ConsoleHeader';
import DroneFeed from '@/components/DroneFeed';
import RobotSpeech from '@/components/RobotSpeech';
import ConsoleFooter from '@/components/ConsoleFooter';
import FullScreenToggle from '@/components/FullScreenToggle';
import { useRobotActivation } from '@/hooks/useRobotActivation';

const Index = () => {
  const { isActivated, isEyeOpen, showConsole } = useRobotActivation();
  const [isDroneFullScreen, setIsDroneFullScreen] = useState(false);
  const [isCaptionFullScreen, setIsCaptionFullScreen] = useState(false);

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
      {!showConsole && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <RobotEye isOpen={isEyeOpen} />
        </div>
      )}
      
      {/* Full screen toggle buttons (visible only when console is shown) */}
      {showConsole && (
        <FullScreenToggle 
          isDroneFullScreen={isDroneFullScreen}
          isCaptionFullScreen={isCaptionFullScreen}
          onToggleDroneFullScreen={handleToggleDroneFullScreen}
          onToggleCaptionFullScreen={handleToggleCaptionFullScreen}
        />
      )}
      
      {/* Main console content */}
      <div className="max-w-7xl w-full mx-auto">
        {isDroneFullScreen ? (
          <div className="w-full h-screen">
            <DroneFeed isActive={showConsole} isFullScreen={true} />
          </div>
        ) : (
          <div 
            className={`w-full transition-opacity duration-1000 ease-in-out
              ${showConsole ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Console header */}
            <ConsoleHeader 
              title="Disaster Management Console" 
              isOnline={showConsole} 
            />
            
            {/* Main content grid - adjusted for fullscreen modes */}
            <div className={`grid ${
              isCaptionFullScreen ? 'grid-cols-1' : 
              'grid-cols-1 md:grid-cols-3'
            } gap-4 mt-4 p-4`}>
              {/* Robot speech + action plan */}
              {(!isDroneFullScreen || isCaptionFullScreen) && (
                <div className={`${
                  isCaptionFullScreen ? 'col-span-full h-[80vh]' :
                  'md:col-span-1 h-[500px]'
                } transition-all duration-300`}>
                  <RobotSpeech isActive={showConsole} />
                </div>
              )}
              
              {/* Live drone feed */}
              {(!isCaptionFullScreen || isDroneFullScreen) && (
                <div className={`${
                  'md:col-span-2 h-[500px]'
                } transition-all duration-300`}>
                  <DroneFeed isActive={showConsole} />
                </div>
              )}
            </div>
            
            {/* Footer with action buttons */}
            <ConsoleFooter isActive={showConsole} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
