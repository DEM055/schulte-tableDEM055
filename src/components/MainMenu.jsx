function MainMenu({ onStartGame, onSettings, onStatistics }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">Таблица Шульте</h1>
        <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg">
          Тренировка концентрации и скорости восприятия
        </p>
        
        <div className="space-y-4">
          <button
            onClick={onStartGame}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 md:py-4 px-6 rounded-lg transition-all duration-200 text-base md:text-lg transform hover:scale-105 active:scale-95"
          >
            Начать игру
          </button>
          
          <button
            onClick={onSettings}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 md:py-4 px-6 rounded-lg transition-all duration-200 text-base md:text-lg transform hover:scale-105 active:scale-95"
          >
            ⚙️ Настройки
          </button>
          
          <button
            onClick={onStatistics}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 md:py-4 px-6 rounded-lg transition-all duration-200 text-base md:text-lg transform hover:scale-105 active:scale-95"
          >
            📊 Статистика
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainMenu 