import { useCallback, useState } from "react";

export default function useSettingsVisibility() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openSettings = useCallback(() => {
    setIsSettingsOpen(true);
  }, []);
  const closeSettings = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  return { isSettingsOpen, openSettings, closeSettings };
}
