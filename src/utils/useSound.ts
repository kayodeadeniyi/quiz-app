import { useCallback } from 'react';
import { Howl } from 'howler';

export function useSound() {
  // The returned function takes a filename (string) and plays the sound
  return useCallback((name: string) => {
    const sound = new Howl({ src: [`assets/sounds/${name}`] });
    sound.play();
  }, []);
}
