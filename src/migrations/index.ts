import * as migration_20250409_104153 from './20250409_104153';
import * as migration_20250409_113458 from './20250409_113458';
import * as migration_20250410_100532 from './20250410_100532';
import * as migration_20250411_053926 from './20250411_053926';

export const migrations = [
  {
    up: migration_20250409_104153.up,
    down: migration_20250409_104153.down,
    name: '20250409_104153',
  },
  {
    up: migration_20250409_113458.up,
    down: migration_20250409_113458.down,
    name: '20250409_113458',
  },
  {
    up: migration_20250410_100532.up,
    down: migration_20250410_100532.down,
    name: '20250410_100532',
  },
  {
    up: migration_20250411_053926.up,
    down: migration_20250411_053926.down,
    name: '20250411_053926'
  },
];
