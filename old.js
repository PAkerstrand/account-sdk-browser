/* Copyright 2018 Schibsted Products & Technology AS. Licensed under the terms of the MIT license.
 * See LICENSE.md in the project root.
 */

/* This file is usually not used by the SDK, but is a simple wrapper to generate a file where the
 * three classes Identity, Monetization and Payment are available on the window object.
 */

'use strict';

require('regenerator-runtime/runtime');

const Identity = require('./identity');
const Monetization = require('./monetization');
const Payment = require('./payment');

window.Identity = Identity;
window.Monetization = Monetization;
window.Payment = Payment;
