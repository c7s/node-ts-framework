export const Type = {
  ServerConfig: Symbol('ServerConfig'),
  LogConfig: Symbol('LogConfig'),

  DbConfig: Symbol('DbConfig'),
  DbConnection: Symbol('DbConnection'),

  RedisConfig: Symbol('RedisConfig'),
  RedisConnection: Symbol('RedisConnection'),

  ServicesConfig: Symbol('ServicesConfig'),
  ServiceDiscovery: Symbol('ServiceDiscovery'),

  AppLogger: Symbol('AppLogger'),
  AccessLogger: Symbol('AccessLogger'),
  DbLogger: Symbol('DbLogger'),
};
