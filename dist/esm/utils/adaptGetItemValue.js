const adaptGetItemValue = getItemValue => item => item == null ? '' : getItemValue ? getItemValue(item) : item.toString();

export { adaptGetItemValue };
