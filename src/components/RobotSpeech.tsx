import React, { useState, useEffect } from 'react';
import { List, ArrowRight, CheckCircle2 } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface Action {
  id: number;
  text: string;
  completed: boolean;
}

interface RobotSpeechProps {
  isActive: boolean;
  onToggleDroneFullScreen?: () => void;
  onToggleCaptionFullScreen?: () => void;
  onToggleHome?: () => void;
}

const RobotSpeech: React.FC<RobotSpeechProps> = ({
  isActive,
  onToggleDroneFullScreen,
  onToggleCaptionFullScreen,
  onToggleHome
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [speech, setSpeech] = useState<string[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [captionBuffer, setCaptionBuffer] = useState<string>("");

  useEffect(() => {
    if (!isActive) return;

    const newSocket = io("https://fateh-2.onrender.com");
    setSocket(newSocket);

    newSocket.on("assistant_reply", (data: { reply: string }) => {
      setSpeech((prev) => {
        const updated = [...prev, data.reply];
        return updated.slice(-2); // Keep only the latest 2 messages
      });
    });

    newSocket.on("caption", (data: { word: string }) => {
      setCaptionBuffer((prev) => {
        const updated = prev + " " + data.word;
        setSpeech((prevLines) => {
          const updatedLines = [...prevLines];
          if (
            updatedLines.length === 0 ||
            updatedLines[updatedLines.length - 1].length > 100
          ) {
            updatedLines.push(data.word);
          } else {
            updatedLines[updatedLines.length - 1] += " " + data.word;
          }
          return updatedLines.slice(-2); // Keep only the latest 2 messages
        });
        return updated;
      });
    });

    newSocket.on("control", (data: { action: string }) => {
      const readable = data.action.replace(/_/g, " ");
      setActions((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: `Command: ${readable}`,
          completed: false,
        },
      ]);

      // Fullscreen routing actions
      switch (data.action) {
        case "fullscreen":
          onToggleDroneFullScreen?.();
          break;
        case "caption_fullscreen":
          onToggleCaptionFullScreen?.();
          break;
        case "show_home":
          onToggleHome?.();
          break;
        default:
          break;
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [isActive]);

  const toggleActionComplete = (id: number) => {
    setActions((prev) =>
      prev.map((action) =>
        action.id === id ? { ...action, completed: !action.completed } : action
      )
    );
  };

  return (
    <div className={`glass-panel h-full flex flex-col opacity-0 ${isActive ? 'animate-fade-in-delay-1' : ''}`}>
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white">Robot Speech (Live Captions)</h2>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-2 mb-6">
          {speech.length > 0 ? (
            speech.map((text, idx) => (
              <div key={idx} className="flex items-start gap-2 text-lg text-white/90">
                <ArrowRight className="mt-1 min-w-5 text-robot-accent" size={18} />
                <div>{text}</div>
              </div>
            ))
          ) : (
            <div className="text-white/50 italic text-center py-4">Awaiting robot communication...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RobotSpeech;
