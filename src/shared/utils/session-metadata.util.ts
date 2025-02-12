import type { Request } from 'express';
import type { SessionMetaData } from '../types/session-metadata.types';
import { IS_DEV_ENV } from './is-dev.util';
import DeviceDetector = require('device-detector-js');
import { lookup } from 'geoip-lite';
import * as countries from 'i18n-iso-countries'

countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

export function getSessionMetadata(
  req: Request,
  userAgent: string,
): SessionMetaData {
  const ip = IS_DEV_ENV
    ? '173.166.164.121'
    : Array.isArray(req.headers['cf-connecting-ip'])
      ? req.headers['cf-connecting-ip'][0]
      : req.headers['cf-connecting-ip'] ||
      (typeof req.headers['x-forwarded-for'] === 'string' ? req.headers['x-forwarded-for'].split(',')[0] : req.ip);

  const location = lookup(ip);
  const device = new DeviceDetector().parse(userAgent);

  return {
    location: {
      country: location?.country ? countries.getName(location.country, 'en') : 'Неизвестно', 
      city: location?.city || 'Неизвестно', 
      longitude: location?.ll ? location.ll[0] : 0,
      latitude: location?.ll ? location.ll[1] : 0, 
    },
    device: {
      browser: device?.client?.name || 'Неизвестный браузер', 
      os: device?.os?.name || 'Неизвестная ОС', 
      type: device?.device?.type || 'Неизвестное устройство',
    },
    ip,
  };
}
