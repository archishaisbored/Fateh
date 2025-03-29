#NDRF Disaster Response Console

A real-time disaster management web application integrating live drone feed, voice-assisted robot control, and Gemini AI for emergency analysis.

#Project Structure

```bash
.
├── public/                      # Public assets
├── server/
│   └── robot-server/           # WebSocket server (Node.js)
│       ├── ws-server.js        # Socket.IO logic (events, control, captions)
│       └── package.json        # Server dependencies
├── src/                        # Frontend React code
│   ├── components/             # Reusable UI components
│   │   ├── ui/
│   │   │   ├── ConsoleHeader.tsx
│   │   │   ├── ConsoleFooter.tsx
│   │   │   ├── DroneFeed.tsx
│   │   │   ├── FullScreenToggle.tsx
│   │   │   ├── RobotEye.tsx
│   │   │   └── RobotSpeech.tsx
│   ├── hooks/                  # Custom hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── useRobotActivation.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/                  # Main routes
│   │   ├── Index.tsx           # Main control dashboard
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
