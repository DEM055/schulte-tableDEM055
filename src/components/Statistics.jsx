function Statistics({ stats, onClearStats, onBack }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const calculateAverageTime = () => {
    if (stats.length === 0) return 0
    const totalSeconds = stats.reduce((sum, stat) => sum + stat.time, 0)
    return Math.round(totalSeconds / stats.length)
  }

  const getBestTime = () => {
    if (stats.length === 0) return null
    return Math.min(...stats.map(stat => stat.time))
  }

  const averageTime = calculateAverageTime()
  const bestTime = getBestTime()

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        {/* Заголовок и кнопка назад */}
        <div className="flex items-center mb-6 md:mb-8">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 text-lg md:text-xl font-bold mr-4"
          >
            ←
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Статистика</h1>
        </div>

        {/* Общая статистика */}
        <div className="bg-gray-50 rounded-lg p-3 md:p-4 mb-6">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3">Общие показатели</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Игр сыграно:</span>
              <span className="font-semibold">{stats.length}</span>
            </div>
            {stats.length > 0 && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Среднее время:</span>
                  <span className="font-semibold">{formatTime(averageTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Лучшее время:</span>
                  <span className="font-semibold text-green-600">{formatTime(bestTime)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Список игр */}
        <div className="mb-6">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-3">История игр</h2>
          {stats.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Нет завершённых игр</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {stats.slice().reverse().map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-2 md:p-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-900">
                      {stat.tableSize} × {stat.tableSize}
                    </span>
                    <span className="text-blue-600 font-semibold">
                      {formatTime(stat.time)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(stat.date)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Кнопка очистки */}
        {stats.length > 0 && (
          <button
            onClick={onClearStats}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 md:py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-sm md:text-base"
          >
            Удалить статистику
          </button>
        )}
      </div>
    </div>
  )
}

export default Statistics 