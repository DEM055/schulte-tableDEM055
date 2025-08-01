function Settings({ settings, onSettingsChange, onBack }) {
  const handleSettingChange = (key, value) => {
    // Валидация значений
    if (key === 'tableSize' && (value < 5 || value > 10)) {
      return
    }
    if (key === 'centerDotOpacity' && (value < 0.1 || value > 1)) {
      return
    }
    
    onSettingsChange(prev => ({
      ...prev,
      [key]: value
    }))
  }

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
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Настройки</h1>
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* Размер таблицы */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Размер таблицы
            </label>
            <select
              value={settings.tableSize}
              onChange={(e) => handleSettingChange('tableSize', parseInt(e.target.value))}
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            >
              <option value={5}>5 × 5</option>
              <option value={6}>6 × 6</option>
              <option value={7}>7 × 7</option>
              <option value={8}>8 × 8</option>
              <option value={9}>9 × 9</option>
              <option value={10}>10 × 10</option>
            </select>
          </div>

          {/* Центральная точка */}
          <div>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={settings.showCenterDot}
                onChange={(e) => handleSettingChange('showCenterDot', e.target.checked)}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Показывать центральную точку
              </span>
            </label>
            
            {settings.showCenterDot && (
              <div className="ml-7">
                <label className="block text-xs md:text-sm text-gray-600 mb-1">
                  Прозрачность: {Math.round(settings.centerDotOpacity * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={settings.centerDotOpacity}
                  onChange={(e) => handleSettingChange('centerDotOpacity', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Подсказка следующего числа */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.showNextNumberHint}
                onChange={(e) => handleSettingChange('showNextNumberHint', e.target.checked)}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Показывать подсказку следующего числа
              </span>
            </label>
          </div>

          {/* Звуковые эффекты */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Включить звуковые эффекты
              </span>
            </label>
          </div>

          {/* Звук монеты */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.coinSoundEnabled}
                onChange={(e) => handleSettingChange('coinSoundEnabled', e.target.checked)}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Звук монеты при верном нажатии
              </span>
            </label>
          </div>

          {/* Показывать туториал */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.showTutorial}
                onChange={(e) => handleSettingChange('showTutorial', e.target.checked)}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Показывать туториал перед игрой
              </span>
            </label>
          </div>



          {/* Голосовые напоминания */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.voiceReminders}
                onChange={(e) => handleSettingChange('voiceReminders', e.target.checked)}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Голосовые напоминания во время игры
              </span>
            </label>
          </div>

          {/* Перемешивание таблицы при клике */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.shuffleOnClick}
                onChange={(e) => handleSettingChange('shuffleOnClick', e.target.checked)}
                className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Перемешивать таблицу при каждом клике на нужную цифру
              </span>
            </label>
          </div>

          {/* Порядок символов */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Порядок символов
            </label>
            <select
              value={settings.numberOrder}
              onChange={(e) => handleSettingChange('numberOrder', e.target.value)}
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            >
              <option value="ascending">Прямой (1, 2, 3, ...)</option>
              <option value="descending">Обратный (N, N-1, N-2, ...)</option>
              <option value="random">Случайный</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 