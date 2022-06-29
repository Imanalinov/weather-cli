#!/usr/bin/env node

import { getArgs } from './helpers/args.js';
import { printHelp, printError, printSuccess, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getCity, getIcon } from './services/api.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Вы не передали токен');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Токен сохранен');
  } catch (error) {
    printError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError('Вы не передали город');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('Город успешно сохранен');
  } catch (error) {
    printError(error.message);
  }
};

const getForcast = async () => {
  try {
    const city = await getKeyValue(TOKEN_DICTIONARY.city);
    const weather = await getCity(city);
    printWeather(weather, await getIcon(weather.weather[0].icon));
  } catch (error) {
    if (error?.response?.status === 400) {
      printError('Неверно указан город');
    } else if (error?.response?.status === 401) {
      printError('Неверно указан токен');
    } else {
      printError(error);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    // Help
    return printHelp();
  }
  if (args.t) {
    // Token
    return saveToken(args.t);
  }
  if (args.s) {
    // City
    return saveCity(args.s);
  }
  return getForcast();
};

initCLI();
