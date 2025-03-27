
import { useState, useEffect } from 'react';

export function useRobotActivation() {
  const [isActivated, setIsActivated] = useState(false);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [showConsole, setShowConsole] = useState(false);

  // Simulate receiving a command from backend (would be replaced with actual API call)
  useEffect(() => {
    const activationTimer = setTimeout(() => {
      setIsActivated(true);
    }, 2000); // Simulate 2 second delay before activation

    return () => clearTimeout(activationTimer);
  }, []);

  // Handle eye animation sequence
  useEffect(() => {
    if (isActivated) {
      // First left eye opens slightly
      const leftEyeTimer = setTimeout(() => {
        setIsEyeOpen(true);
      }, 1000);

      // Then show console
      const consoleTimer = setTimeout(() => {
        setShowConsole(true);
      }, 4000); // Increased time to allow for eye animation to be appreciated

      return () => {
        clearTimeout(leftEyeTimer);
        clearTimeout(consoleTimer);
      };
    }
  }, [isActivated]);

  return { isActivated, isEyeOpen, showConsole };
}
