// Desktop audio service using Web Audio API
import { DesktopAthanPreferencesService } from './AthanService';

export class DesktopAudioService {
  private audioContext: AudioContext | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private source: AudioBufferSourceNode | null = null;

  async initialize() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  async setReciter(_reciterId: string) {
    const url = DesktopAthanPreferencesService.getAthanUrl();
    await this.loadAthan(url);
  }

  async loadPreferredAthan() {
    const url = DesktopAthanPreferencesService.getAthanUrl();
    await this.loadAthan(url);
  }

  async loadAthan(url: string) {
    if (!this.audioContext) {
      await this.initialize();
    }

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error('Error loading athan:', error);
    }
  }

  async playAthan(volume: number = 0.8) {
    if (!this.audioContext || !this.audioBuffer) {
      console.error('Audio not initialized');
      return;
    }

    try {
      // Stop any currently playing audio
      this.stopAthan();

      // Create new source
      this.source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      this.source.buffer = this.audioBuffer;
      gainNode.gain.value = volume;
      
      this.source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      this.source.start(0);
    } catch (error) {
      console.error('Error playing athan:', error);
    }
  }

  stopAthan() {
    if (this.source) {
      try {
        this.source.stop();
      } catch (e) {
        // Source may already be stopped
      }
      this.source = null;
    }
  }
}
