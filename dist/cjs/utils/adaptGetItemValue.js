'use strict';

const adaptGetItemValue = getItemValue => item => item == null ? '' : getItemValue ? getItemValue(item) : item.toString();

exports.adaptGetItemValue = adaptGetItemValue;
