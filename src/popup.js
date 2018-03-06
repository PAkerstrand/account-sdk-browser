/* Copyright 2018 Schibsted Products & Technology AS. Licensed under the terms of the MIT license.
 * See LICENSE.md in the project root.
 */

const { assert, isObject, isUrl } = require('./validate');
const { cloneDefined } = require('./object');

/**
 * Serializes an object to string.
 * @memberof core
 * @private
 * @param {object} obj - for example {a: 'b', c: 1}
 * @return {string} - for example 'a=b,c=1'
 */
function serialize(obj) {
    assert(isObject(obj), `Object must be an object but it is '${obj}'`);
    return Object.keys(obj)
        .map(key => `${key}=${obj[key]}`)
        .join(',');
}

const defaultWindowFeatures = {
    scrollbars: 'yes',
    location: 'yes',
    status: 'no',
    menubar: 'no',
    toolbar: 'no',
    resizable: 'yes'
};

/**
 * Opens a popup
 * @param {Window} parentWindow - A reference to the window that will open the popup
 * @param {string} url - The URL that the popup will open
 * @param {string} [windowName] - A name for the window
 * @param {object} [windowFeatures] - Window features for the popup (default ones are usually ok)
 * @returns {Window|null} - A reference to the popup window
 * @private
 */
function open(parentWindow, url, windowName = '', windowFeatures) {
    assert(isObject(parentWindow), `window was supposed to be an object but it is ${parentWindow}`);
    assert(isUrl(url), 'Invalid URL for popup');

    const { height, width } = parentWindow.screen;

    let mergedFeatures = cloneDefined(defaultWindowFeatures, windowFeatures);
    if (Number.isFinite(mergedFeatures.width)) {
        mergedFeatures.left = (width - mergedFeatures.width) / 2;
    }
    if (Number.isFinite(mergedFeatures.height)) {
        mergedFeatures.top = (height - mergedFeatures.height) / 2;
    }
    const features = serialize(mergedFeatures);
    return parentWindow.open(url, windowName, features);
}

module.exports = { open };
