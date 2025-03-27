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
}

const RobotSpeech: React.FC<RobotSpeechProps> = ({ isActive }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [speech, setSpeech] = useState<string[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [captionBuffer, setCaptionBuffer] = useState<string>("");

  useEffect(() => {
    if (!isActive) return;

    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.on("caption", (data: { word: string }) => {
      setCaptionBuffer((prev) => {
        const updated = prev + " " + data.word;
        setSpeech((prevLines) => {
          const updatedLines = [...prevLines];
          if (updatedLines.length === 0 || updatedLines[updatedLines.length - 1].length > 100) {
            updatedLines.push(data.word);
          } else {
            updatedLines[updatedLines.length - 1] += " " + data.word;
          }
          return updatedLines;
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

        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <List className="text-robot-accent" size={18} />
            <h3 className="font-medium text-white">Gemini Action Plan</h3>
          </div>

          <div className="space-y-2">
            {actions.length > 0 ? (
              actions.map((action) => (
                <div
                  key={action.id}
                  onClick={() => toggleActionComplete(action.id)}
                  className={`action-item flex items-center gap-3 ${
                    action.completed ? 'bg-robot-success/20 border border-robot-success/40' : ''
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      action.completed
                        ? 'text-robot-success'
                        : 'text-white/30 border border-white/30'
                    }`}
                  >
                    {action.completed && <CheckCircle2 size={20} />}
                  </div>
                  <span className={action.completed ? 'line-through text-white/50' : 'text-white'}>
                    {action.text}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-white/50 italic text-center py-4">Waiting for instructions...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotSpeech;
