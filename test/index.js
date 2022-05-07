'use strict';

import { readdir } from 'fs/promises';

(async () => {
  const units = await (await readdir('./test/units')).reduce(async (arr, unit) => {
    const res = await import(`./units/${unit}`);

    if (res) {
      (await arr).push(res.default);
    }

    return arr;
  }, []);

  for (let i = 0; i < units.length; i++) {
    units[i]();
  }
})();
