import { useCallback, useState } from 'react'

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speak = useCallback((text, options = {}) => {
    const { voiceType = 'male', rate = 1.0 } = options
    try {
      // Проверяем поддержку Web Speech API
      if (!window.speechSynthesis) {
        console.warn('Web Speech API не поддерживается в этом браузере')
        return
      }

      // Останавливаем предыдущую речь
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      
      // Настройки голоса
      utterance.lang = 'ru-RU'
      utterance.rate = rate // Скорость речи
      utterance.pitch = voiceType === 'male' ? 0.8 : 1.2 // Тон голоса
      utterance.volume = 1.0 // Громкость

      // Функция для установки голоса
      const setVoice = () => {
        const voices = window.speechSynthesis.getVoices()
        
        if (voiceType === 'male') {
          // Ищем русский мужской голос
          const maleVoice = voices.find(voice => 
            voice.lang.includes('ru') && 
            (voice.name.includes('male') || voice.name.includes('муж') || voice.name.includes('Алексей') || voice.name.includes('Dmitri') || voice.name.includes('Yuri'))
          ) || voices.find(voice => voice.lang.includes('ru'))
          
          if (maleVoice) {
            utterance.voice = maleVoice
          }
        } else {
          // Ищем русский женский голос
          const femaleVoice = voices.find(voice => 
            voice.lang.includes('ru') && 
            (voice.name.includes('female') || voice.name.includes('жен') || voice.name.includes('Анна') || voice.name.includes('Elena') || voice.name.includes('Milena'))
          ) || voices.find(voice => voice.lang.includes('ru'))
          
          if (femaleVoice) {
            utterance.voice = femaleVoice
          }
        }
      }

      // Пытаемся установить голос сразу
      setVoice()

      // Если голоса еще не загружены, ждем их загрузки
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = setVoice
      }

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = (event) => {
        console.warn('Ошибка речи:', event.error)
        setIsSpeaking(false)
      }

      window.speechSynthesis.speak(utterance)
    } catch (error) {
      console.warn('Не удалось воспроизвести речь:', error)
      setIsSpeaking(false)
    }
  }, [])

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [])

  return { speak, stop, isSpeaking }
} 