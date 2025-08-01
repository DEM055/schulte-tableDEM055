import { useCallback } from 'react'

export const useSound = () => {
  const playClick = useCallback(() => {
    try {
      // Создаем простой звук клика
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } catch (error) {
      // Игнорируем ошибки звука
      console.warn('Не удалось воспроизвести звук:', error)
    }
  }, [])

  const playSuccess = useCallback(() => {
    try {
      // Создаем звук успеха
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (error) {
      // Игнорируем ошибки звука
      console.warn('Не удалось воспроизвести звук:', error)
    }
  }, [])

  const playCoin = useCallback(() => {
    try {
      // Создаем короткий и быстрый звук звонкой монеты
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Высокая частота для звонкого звука
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.05)
      
      // Быстрый fade in/out для короткого звука
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.08)
    } catch (error) {
      // Игнорируем ошибки звука
      console.warn('Не удалось воспроизвести звук монеты:', error)
    }
  }, [])

  return { playClick, playSuccess, playCoin }
} 