import { useState, useEffect } from 'react'
import MainMenu from './components/MainMenu'
import Game from './components/Game'
import Settings from './components/Settings'
import Statistics from './components/Statistics'
import Tutorial from './components/Tutorial'

function App() {
  const [settings, setSettings] = useState({
    tableSize: 5,
    showCenterDot: true,
    centerDotOpacity: 0.7,
    showNextNumberHint: true,
    soundEnabled: true,
    showTutorial: true,
    voiceType: 'male',
    voiceReminders: true,
    shuffleOnClick: true,
    numberOrder: 'ascending', // 'ascending', 'descending', 'random'
    coinSoundEnabled: true
  })
  const [gameStats, setGameStats] = useState([])
  const [currentScreen, setCurrentScreen] = useState('menu')
  const [showTutorial, setShowTutorial] = useState(true)

  // Загрузка настроек и статистики из localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('schulteSettings')
      const savedStats = localStorage.getItem('schulteStats')
      
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings)
        // Валидация настроек
        if (parsedSettings.tableSize >= 5 && parsedSettings.tableSize <= 10) {
          setSettings(parsedSettings)
        }
      }
      
      if (savedStats) {
        const parsedStats = JSON.parse(savedStats)
        if (Array.isArray(parsedStats)) {
          setGameStats(parsedStats)
        }
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error)
    }
  }, [])

  // Сохранение настроек в localStorage
  useEffect(() => {
    localStorage.setItem('schulteSettings', JSON.stringify(settings))
  }, [settings])

  // Сохранение статистики в localStorage
  useEffect(() => {
    localStorage.setItem('schulteStats', JSON.stringify(gameStats))
  }, [gameStats])

  const addGameResult = (result) => {
    setGameStats(prev => [...prev, result])
  }

  const clearStatistics = () => {
    if (window.confirm('Вы уверены, что хотите удалить всю статистику? Это действие нельзя отменить.')) {
      setGameStats([])
    }
  }

  const handleStartGame = () => {
    if (settings.showTutorial && showTutorial) {
      setCurrentScreen('tutorial')
    } else {
      setCurrentScreen('game')
    }
  }

  const handleTutorialComplete = () => {
    setShowTutorial(false)
    setCurrentScreen('game')
  }

  const handleTutorialSkip = () => {
    setShowTutorial(false)
    setCurrentScreen('game')
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return <MainMenu onStartGame={handleStartGame} onSettings={() => setCurrentScreen('settings')} onStatistics={() => setCurrentScreen('statistics')} />
      case 'tutorial':
        return <Tutorial onComplete={handleTutorialComplete} onSkip={handleTutorialSkip} voiceType={settings.voiceType} />
      case 'game':
        return <Game settings={settings} onBack={() => setCurrentScreen('menu')} onGameComplete={addGameResult} />
      case 'settings':
        return <Settings settings={settings} onSettingsChange={setSettings} onBack={() => setCurrentScreen('menu')} />
      case 'statistics':
        return <Statistics stats={gameStats} onClearStats={clearStatistics} onBack={() => setCurrentScreen('menu')} />
      default:
        return <MainMenu onStartGame={handleStartGame} onSettings={() => setCurrentScreen('settings')} onStatistics={() => setCurrentScreen('statistics')} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {renderScreen()}
    </div>
  )
}

export default App 