import { useEffect, useState } from 'react'
import { useSpeech } from '../hooks/useSpeech'

function Tutorial({ onComplete, onSkip, voiceType = 'male' }) {
  const { speak, stop, isSpeaking } = useSpeech()
  const [step, setStep] = useState(0)

  const tutorialText = "Перед началом работы с таблицей взгляд фиксируется в её центре и больше не сдвигается. Очень важно избегать передвижений взгляда из центра и искать числа только периферическим зрением."

  useEffect(() => {
    // Запускаем голосовой туториал с увеличенной скоростью (1.25x)
    speak(tutorialText, { 
      voiceType: voiceType, 
      rate: 1.25 
    })

    return () => {
      stop()
    }
  }, [speak, stop])

  const handleComplete = () => {
    stop()
    onComplete()
  }

  const handleSkip = () => {
    stop()
    onSkip()
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="text-6xl mb-6">🎯</div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Как правильно работать с таблицей Шульте
          </h1>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="text-blue-400 text-xl">💡</div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 leading-relaxed">
                  {tutorialText}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-gray-500">
              {isSpeaking ? '🔊 Воспроизводится голосовой туториал...' : '✅ Туториал завершен'}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleComplete}
            disabled={isSpeaking}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none"
          >
            {isSpeaking ? 'Слушаю...' : 'Начать игру'}
          </button>
          
          <button
            onClick={handleSkip}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Пропустить туториал
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tutorial 