import React from 'react';
import { EyeIcon } from 'lucide-react';

interface RobotEyeProps {
  isOpen: boolean;
}

const RobotEye: React.FC<RobotEyeProps> = ({ isOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-screen h-screen flex items-center justify-center bg-robot-dark">
        <div className="flex gap-32 items-center justify-center transform scale-100 md:scale-125 lg:scale-150">
          {/* Left Eye */}
          <div className="relative w-40 h-40 rounded-full bg-black overflow-hidden flex items-center justify-center">
            {isOpen ? (
              <div className="w-full h-full flex items-center justify-center">
                {/* Blue glow */}
                <div className="absolute inset-0 bg-blue-500/30 blur-xl"></div>
                {/* Eye opening animation */}
                <div className="w-28 h-28 rounded-full bg-black border-2 border-gray-800 flex items-center justify-center">
                  <div
                    className={`w-24 h-24 rounded-full bg-gradient-to-b from-blue-400 to-blue-600
                    transform transition-all duration-1000 flex items-center justify-center
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                  >
                    {/* Light reflection */}
                    <div className="w-10 h-10 rounded-full bg-blue-300 opacity-70 absolute top-4 right-6 blur-sm"></div>
                    <div className="w-4 h-4 rounded-full bg-white absolute top-5 right-7"></div>
                  </div>
                </div>
                {/* Eyelid animation */}
                <div
                  className={`absolute inset-0 w-full bg-black transition-transform duration-1000 ease-in-out
                  transform ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
                ></div>
              </div>
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center">
                {/* Closed eye slit */}
                <div className="w-24 h-1 bg-gray-800 rounded-full"></div>
              </div>
            )}
          </div>

          {/* Right Eye */}
          <div className="relative w-40 h-40 rounded-full bg-black overflow-hidden flex items-center justify-center">
            {isOpen ? (
              <div className="w-full h-full flex items-center justify-center">
                {/* Blue glow */}
                <div className="absolute inset-0 bg-blue-500/30 blur-xl"></div>
                {/* Eye opening animation */}
                <div className="w-28 h-28 rounded-full bg-black border-2 border-gray-800 flex items-center justify-center">
                  <div
                    className={`w-24 h-24 rounded-full bg-gradient-to-b from-blue-400 to-blue-600
                    transform transition-all duration-1000 flex items-center justify-center
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                  >
                    {/* Light reflection */}
                    <div className="w-10 h-10 rounded-full bg-blue-300 opacity-70 absolute top-4 right-6 blur-sm"></div>
                    <div className="w-4 h-4 rounded-full bg-white absolute top-5 right-7"></div>
                  </div>
                </div>
                {/* Eyelid animation with slightly different timing */}
                <div
                  className={`absolute inset-0 w-full bg-black transition-transform duration-1200 ease-in-out delay-100
                  transform ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}
                ></div>
              </div>
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center">
                {/* Closed eye slit */}
                <div className="w-24 h-1 bg-gray-800 rounded-full"></div>
              </div>
            )}
          </div>
        </div>
        <div className={`text-xl font-medium text-center absolute bottom-20 transition-all duration-500 ${isOpen ? 'text-blue-400' : 'text-gray-500'}`}>
          {isOpen ? "SYSTEM ONLINE" : "STANDBY MODE"}
        </div>
      </div>
    </div>
  );
};

export default RobotEye;
