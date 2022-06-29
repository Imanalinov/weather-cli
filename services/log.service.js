import chalk from 'chalk';

export const printError = (error) => {
  console.log(chalk.bgRedBright(' ERROR: '), error);
};

export const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS: '), message);
};

export const printHelp = () => {
  console.log(`
${chalk.bgYellowBright(' HELP: ')}
    Без параметров – вывод погоды 
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
              `);
};

export const printWeather = (response, icon) => {
  console.log(`
${chalk.bgYellow(' WEATHER ')} Погода в городе ${response.name}
  ${icon}  ${response.weather[0].description}
  Температура: ${response.main.temp} (ощущается как ${response.main.feels_like})
  Влажность: ${response.main.humidity}%
  Скорость ветра: ${response.wind.speed} 
  `);
};
