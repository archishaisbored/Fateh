import React from 'react';
import { Maximize2, CaptionsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FullScreenToggleProps {
  isDroneFullScreen: boolean;
  isCaptionFullScreen: boolean;
  onToggleDroneFullScreen: () => void;
  onToggleCaptionFullScreen: () => void;
}

const FullScreenToggle: React.FC<FullScreenToggleProps> = ({
  isDroneFullScreen,
  isCaptionFullScreen,
  onToggleDroneFullScreen,
  onToggleCaptionFullScreen
}) => {
  return (
    <div className="fixed top-4 right-4 z-20 flex gap-2">
      <Button
        variant="outline"
        size="sm"
        className={`bg-black/30 border-white/20 hover:bg-black/50 ${isDroneFullScreen ? 'text-robot-accent' : 'text-white/70'}`}
        onClick={onToggleDroneFullScreen}
      >
        <Maximize2 size={16} className="mr-1" />
        Drone View
      </Button>
      
      <Button 
        variant="outline"
        size="sm"
        className={`bg-black/30 border-white/20 hover:bg-black/50 ${isCaptionFullScreen ? 'text-robot-accent' : 'text-white/70'}`}
        onClick={onToggleCaptionFullScreen}
      >
        <CaptionsIcon size={16} className="mr-1" />
        Captions
      </Button>
    </div>
  );
};

export default FullScreenToggle;
