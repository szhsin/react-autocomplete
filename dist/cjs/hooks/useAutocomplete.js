'use strict';

var React = require('react');
var useId = require('./useId.js');
var common = require('../common.js');

const useAutocomplete = ({
  onChange,
  feature: useFeature,
  isItemSelected,
  inputRef: externalInputRef,
  ...passthrough
}) => {
  const internalInputRef = React.useRef(null);
  const [tmpValue, setTmpValue] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [focusIndex, setFocusIndex] = React.useState(common.defaultFocusIndex);
  const state = {
    isItemSelected,
    inputRef: externalInputRef || internalInputRef,
    focusIndex,
    setFocusIndex,
    open,
    setOpen
  };
  const featureYield = useFeature({
    id: useId.useId(),
    tmpValue,
    setTmpValue,
    onChange: newValue => passthrough.value != newValue && onChange?.(newValue),
    ...passthrough,
    ...state
  });
  return {
    ...state,
    ...featureYield
  };
};

exports.useAutocomplete = useAutocomplete;
