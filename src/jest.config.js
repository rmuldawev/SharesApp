module.exports = {
  // Другие настройки Jest

  // Добавьте преобразование TypeScript с помощью ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Добавьте расширения файлов TypeScript, которые нужно учитывать в тестах
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
