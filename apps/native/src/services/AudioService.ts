import { Audio } from 'expo-av';
import { Platform } from 'react-native';
import { AthanPreferencesService } from './AthanService';

export class AudioService {
  private static instance: AudioService;
  private sound: Audio.Sound | null = null;
  private isPlaying = false;

  private constructor() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: false,
      playThroughEarpieceAndroid: false,
    });
  }

  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  async playAthan(volume: number = 0.8) {
    try {
      // Stop any currently playing audio
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      // Get user's preferred athan URL from API
      const athanUrl = await AthanPreferencesService.getAthanUrl();
      
      const { sound } = await Audio.Sound.createAsync(
        { uri: athanUrl },
        {
          shouldPlay: true,
          volume,
          isLooping: false,
        }
      );

      this.sound = sound;
      this.isPlaying = true;

      // Handle playback finish
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          this.isPlaying = false;
        }
      });
    } catch (error) {
      console.error('Error playing athan:', error);
      // Fallback to default athan
      try {
        const fallbackUrl = 'https://cdn.aladhan.com/athan/default.mp3';
        const { sound } = await Audio.Sound.createAsync(
          { uri: fallbackUrl },
          {
            shouldPlay: true,
            volume,
            isLooping: false,
          }
        );
        this.sound = sound;
        this.isPlaying = true;
      } catch (fallbackError) {
        console.error('Error playing fallback athan:', fallbackError);
      }
    }
  }

  async stopAthan() {
    try {
      if (this.sound) {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
        this.sound = null;
        this.isPlaying = false;
      }
    } catch (error) {
      console.error('Error stopping athan:', error);
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}
