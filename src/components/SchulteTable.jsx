import { useState, useEffect, useMemo } from 'react'

function SchulteTable({ size, currentNumber, onNumberClick, showCenterDot, centerDotOpacity, isPaused, settings }) {
  const [numbers, setNumbers] = useState([])

  // Генерация случайной таблицы
  const generateTable = useMemo(() => {
    const totalNumbers = size * size
    const numberArray = Array.from({ length: totalNumbers }, (_, i) => i + 1)
    
    // Перемешивание массива (алгоритм Фишера-Йейтса)
    for (let i = numberArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[numberArray[i], numberArray[j]] = [numberArray[j], numberArray[i]]
    }
    
    return numberArray
  }, [size])

  // Обновление таблицы при изменении размера или после каждого клика
  useEffect(() => {
    setNumbers(generateTable)
  }, [generateTable, currentNumber, settings?.shuffleOnClick])

  const handleCellClick = (number) => {
    if (!isPaused) {
      onNumberClick(number)
    }
  }

  // Адаптивный размер ячеек
  const [cellSize, setCellSize] = useState(60)

  useEffect(() => {
    const updateCellSize = () => {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      const isMobile = screenWidth < 768
      
      // Адаптивные отступы для мобильных устройств
      const horizontalPadding = isMobile ? 32 : 64
      const verticalPadding = isMobile ? 200 : 300
      
      const maxWidth = Math.min(screenWidth - horizontalPadding, 600)
      const maxHeight = screenHeight - verticalPadding
      
      const calculatedSize = Math.min(maxWidth / size, maxHeight / size, 80)
      setCellSize(Math.max(calculatedSize, isMobile ? 35 : 40)) // Меньший минимальный размер для мобильных
    }

    updateCellSize()
    window.addEventListener('resize', updateCellSize)
    return () => window.removeEventListener('resize', updateCellSize)
  }, [size])

  const fontSize = Math.max(cellSize * 0.4, 16) // Размер шрифта пропорционален размеру ячейки

  return (
    <div className="relative">
      {/* Таблица */}
      <div 
        className={`grid gap-1 ${isPaused ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}
        style={{
          gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${size}, ${cellSize}px)`
        }}
      >
        {numbers.map((number, index) => (
          <button
            key={`${number}-${index}`}
            onClick={() => handleCellClick(number)}
            disabled={isPaused}
            className={`
              border border-gray-300 bg-white hover:bg-gray-50 
              transition-all duration-200 font-bold text-gray-900
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              transform active:scale-95
              ${isPaused ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:shadow-md'}
            `}
            style={{
              width: cellSize,
              height: cellSize,
              fontSize: `${fontSize}px`
            }}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Центральная точка */}
      {showCenterDot && (
        <div
          className="absolute w-1 h-1 bg-red-500 rounded-full pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: centerDotOpacity
          }}
        />
      )}
    </div>
  )
}

export default SchulteTable 