'use strict';

import test from 'node:test';
import assert from 'assert';

import FormsAuthentication from '../lib/index.js';

const ticket = FormsAuthentication.createTicket(
  'MyTicket',
  new Date(), //2022-04-30T19:50:19.140Z
  true,
  'My user data',
  'My cookie path'
);
