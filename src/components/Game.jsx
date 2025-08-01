import { useState, useEffect, useCallback } from 'react'
import SchulteTable from './SchulteTable'
import { useSound } from '../hooks/useSound'
import { useSpeech } from '../hooks/useSpeech'

function Game({ settings, onBack, onGameComplete }) {
  const [gameState, setGameState] = useState('playing') // 'playing', 'paused', 'completed'
  const [currentNumber, setCurrentNumber] = useState(1)
  const [targetNumber, setTargetNumber] = useState(1)
  const [usedNumbers, setUsedNumbers] = useState(new Set())
  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [pauseStartTime, setPauseStartTime] = useState(null)
  const [totalPausedTime, setTotalPausedTime] = useState(0)
  const { playSuccess, playCoin } = useSound()
  const { speak } = useSpeech()
  const [lastReminderTime, setLastReminderTime] = useState(0)

  const maxNumber = settings.tableSize * settings.tableSize

  // Запуск игры
  useEffect(() => {
    if (gameState === 'playing' && !startTime) {
      setStartTime(Date.now())
    }
  }, [gameState, startTime])

  // Таймер и голосовые напоминания
  useEffect(() => {
    let interval
    if (gameState === 'playing' && startTime && !isPaused) {
      interval = setInterval(() => {
        const now = Date.now()
        const totalTime = Math.floor((now - startTime - totalPausedTime) / 1000)
        setElapsedTime(totalTime)

        // Голосовые напоминания каждые 3 минуты (180 секунд)
        if (settings.voiceReminders && totalTime > 0 && totalTime % 180 === 0 && totalTime !== lastReminderTime) {
          setLastReminderTime(totalTime)
          speak("Концентрируй взгляд на центре", { 
            voiceType: settings.voiceType, 
            rate: 1.25 
          })
        }
      }, 100)
    }
    return () => clearInterval(interval)
  }, [gameState, startTime, isPaused, totalPausedTime, settings.voiceReminders, settings.voiceType, speak, lastReminderTime])

  // Обработка паузы
  useEffect(() => {
    if (isPaused && !pauseStartTime) {
      setPauseStartTime(Date.now())
    } else if (!isPaused && pauseStartTime) {
      const pauseDuration = Date.now() - pauseStartTime
      setTotalPausedTime(prev => prev + pauseDuration)
      setPauseStartTime(null)
    }
  }, [isPaused, pauseStartTime])

  // Инициализация игры
  useEffect(() => {
    setUsedNumbers(new Set())
    if (settings.numberOrder === 'random') {
      setTargetNumber(Math.floor(Math.random() * maxNumber) + 1)
    } else if (settings.numberOrder === 'descending') {
      setTargetNumber(maxNumber)
    } else {
      setTargetNumber(1)
    }
  }, [settings.numberOrder, maxNumber])

  // Обработка завершения игры
  useEffect(() => {
    if (currentNumber > maxNumber && startTime) {
      setGameState('completed')
      const finalTime = Math.floor((Date.now() - startTime - totalPausedTime) / 1000)
      onGameComplete({
        date: new Date().toISOString(),
        tableSize: settings.tableSize,
        time: finalTime
      })
    }
  }, [currentNumber, maxNumber, startTime, totalPausedTime, settings.tableSize, onGameComplete])

  const handleNumberClick = useCallback((clickedNumber) => {
    if (clickedNumber === targetNumber) {
      if (settings.coinSoundEnabled) {
        playCoin()
      } else if (settings.soundEnabled) {
        playSuccess()
      }
      
      // Обновляем следующий номер в зависимости от режима
      if (settings.numberOrder === 'ascending') {
        setCurrentNumber(prev => prev + 1)
        setTargetNumber(currentNumber + 1)
      } else if (settings.numberOrder === 'descending') {
        setCurrentNumber(prev => prev + 1)
        setTargetNumber(maxNumber - currentNumber)
      } else if (settings.numberOrder === 'random') {
        setCurrentNumber(prev => prev + 1)
        setUsedNumbers(prev => new Set([...prev, targetNumber]))
        
        // Генерируем новый случайный номер из оставшихся
        const availableNumbers = []
        for (let i = 1; i <= maxNumber; i++) {
          if (!usedNumbers.has(i) && i !== targetNumber) {
            availableNumbers.push(i)
          }
        }
        if (availableNumbers.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableNumbers.length)
          setTargetNumber(availableNumbers[randomIndex])
        }
      }
    }
  }, [targetNumber, currentNumber, maxNumber, playSuccess, playCoin, settings.soundEnabled, settings.coinSoundEnabled, settings.numberOrder])

  const togglePause = () => {
    setIsPaused(prev => !prev)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (gameState === 'completed') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
              <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="text-4xl md:text-6xl mb-4">🎉</div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Игра завершена!</h1>
          <p className="text-base md:text-lg text-gray-600 mb-4">
            Размер таблицы: {settings.tableSize} × {settings.tableSize}
          </p>
          <p className="text-xl md:text-2xl font-bold text-blue-600 mb-6">
            Время: {formatTime(elapsedTime)}
          </p>
        </div>
          
          <div className="space-y-3">
            <button
              onClick={onBack}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 md:py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm md:text-base"
            >
              Вернуться в меню
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 md:py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm md:text-base"
            >
              Играть снова
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Верхняя панель */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 text-xl font-bold"
          >
            ←
          </button>
          
          <div className="text-center">
            <div className="text-xs md:text-sm text-gray-500 mb-1">Время</div>
            <div className="text-xl md:text-2xl font-mono text-gray-900">
              {formatTime(elapsedTime)}
            </div>
          </div>
          
          <div className="w-8"></div> {/* Для центрирования */}
        </div>

        {/* Подсказка следующего числа */}
        {((settings.showNextNumberHint && currentNumber <= maxNumber) || (settings.numberOrder === 'random' && currentNumber <= maxNumber)) && (
          <div className="text-center mb-4 md:mb-6">
            <div className="text-xs md:text-sm text-gray-500 mb-1">
              {settings.numberOrder === 'random' ? 'Найдите число' : 'Следующее число'}
            </div>
            <div className="text-2xl md:text-3xl font-bold text-blue-600">
              {targetNumber}
            </div>
          </div>
        )}

        {/* Таблица Шульте */}
        {!isPaused && (
          <div className="flex justify-center mb-6">
            <SchulteTable
              size={settings.tableSize}
              currentNumber={currentNumber}
              onNumberClick={handleNumberClick}
              showCenterDot={settings.showCenterDot}
              centerDotOpacity={settings.centerDotOpacity}
              isPaused={isPaused}
              settings={settings}
            />
          </div>
        )}

        {/* Сообщение при паузе */}
        {isPaused && (
          <div className="flex justify-center mb-6">
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">⏸️</div>
              <p className="text-gray-600 text-lg">Игра приостановлена</p>
              <p className="text-gray-500 text-sm mt-2">Нажмите "Продолжить" для возобновления</p>
            </div>
          </div>
        )}

        {/* Кнопка паузы */}
        <div className="text-center">
          <button
            onClick={togglePause}
            className={`px-6 md:px-8 py-2 md:py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              isPaused
                ? 'bg-green-200 hover:bg-green-300 text-green-800'
                : 'bg-blue-200 hover:bg-blue-300 text-blue-800'
            }`}
          >
            {isPaused ? 'Продолжить' : 'Пауза'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Game 