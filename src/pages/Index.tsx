import React from "react";
import RobotEye from "@/components/RobotEye";
import ConsoleHeader from "@/components/ConsoleHeader";
import DroneFeed from "@/components/DroneFeed";
import RobotSpeech from "@/components/RobotSpeech";
import ConsoleFooter from "@/components/ConsoleFooter";
import FullScreenToggle from "@/components/FullScreenToggle";
import { useRobotActivation } from "@/hooks/useRobotActivation";

const Index = () => {
  const { isActivated, isEyeOpen, showConsole, socket } = useRobotActivation();
  const [isDroneFullScreen, setIsDroneFullScreen] = React.useState(false);
  const [isCaptionFullScreen, setIsCaptionFullScreen] = React.useState(false);

  React.useEffect(() => {
    socket.on("robot_wakeup", () => {
      console.log("\uD83D\uDC41 Wakeup received from robot");
    });

    socket.on("control", (data) => {
      console.log("\uD83D\uDCE2 Received control event:", data);

      if (data.action === "fullscreen_drone") {
        setIsDroneFullScreen(true);
        setIsCaptionFullScreen(false);
      } else if (data.action === "fullscreen_caption") {
        setIsCaptionFullScreen(true);
        setIsDroneFullScreen(false);
      } else if (data.action === "fullscreen_home") {
        setIsDroneFullScreen(false);
        setIsCaptionFullScreen(false);
      }
    });

    return () => {
      socket.off("robot_wakeup");
      socket.off("control");
    };
  }, [socket]);

  const handleToggleDroneFullScreen = () => {
    setIsDroneFullScreen(!isDroneFullScreen);
    if (!isDroneFullScreen) setIsCaptionFullScreen(false);
  };

  const handleToggleCaptionFullScreen = () => {
    setIsCaptionFullScreen(!isCaptionFullScreen);
    if (!isCaptionFullScreen) setIsDroneFullScreen(false);
  };

  return (
    <div className="min-h-screen w-full bg-robot-dark p-0 flex items-center justify-center">
      {!showConsole && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <RobotEye isOpen={isEyeOpen} />
        </div>
      )}

      {showConsole && (
        <FullScreenToggle
          isDroneFullScreen={isDroneFullScreen}
          isCaptionFullScreen={isCaptionFullScreen}
          onToggleDroneFullScreen={handleToggleDroneFullScreen}
          onToggleCaptionFullScreen={handleToggleCaptionFullScreen}
        />
      )}

      <div className="max-w-7xl w-full mx-auto">
        {isDroneFullScreen ? (
          <div className="w-full h-screen">
            <DroneFeed isActive={showConsole} isFullScreen={true} />
          </div>
        ) : (
          <div className={`w-full transition-opacity duration-1000 ease-in-out ${showConsole ? "opacity-100" : "opacity-0"}`}>
            <ConsoleHeader title="Disaster Management Console" isOnline={showConsole} />

            <div className={`grid ${isCaptionFullScreen ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"} gap-4 mt-4 p-4`}>
              {(!isDroneFullScreen || isCaptionFullScreen) && (
                <div className={`${isCaptionFullScreen ? "col-span-full h-[80vh]" : "md:col-span-1 h-[500px]"} transition-all duration-300`}>
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
