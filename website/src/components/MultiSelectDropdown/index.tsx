import { useState } from 'react';
import { clsx } from 'clsx';
import { useMultiSelect, multiSelectDropdown } from '@szhsin/react-autocomplete';
import ClearIcon from '@site/static/img/x.svg';
import Check from '@site/static/img/check.svg';
import STATES from '@site/src/data/states';
import styles from '@site/src/css/styles.module.css';
import customStyles from './styles.module.css';
import { Checkbox } from '../Checkbox';
import { useAutoScroll } from '../../utils/useAutoScroll';

const MultiSelectDropdown = () => {
  const [rovingText, setRovingText] = useState(true);
  const [closeOnSelect, setCloseOnSelect] = useState(false);
  const [flipOnSelect, setFlipOnSelect] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string[]>(['Alaska', 'Florida']);
  const items = value
    ? STATES.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
    : STATES;

  const {
    getInputProps,
    getClearProps,
    getToggleProps,
    getListProps,
    getItemProps,
    removeSelect,
    isItemSelected,
    isInputActive,
    isTagActive,
    open,
    focusIndex,
    isInputEmpty
  } = useMultiSelect({
    disabled,
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    flipOnSelect,
    feature: multiSelectDropdown({ rovingText, closeOnSelect })
  });

  const listRef = useAutoScroll<HTMLDivElement>(open, items);

  return (
    <div className={styles.wrap}>
      <div className={styles.options}>
        <Checkbox label="rovingText" checked={rovingText} onChange={setRovingText} />
        <Checkbox label="closeOnSelect" checked={closeOnSelect} onChange={setCloseOnSelect} />
        <Checkbox label="flipOnSelect" checked={flipOnSelect} onChange={setFlipOnSelect} />
        <Checkbox label="disabled" checked={disabled} onChange={setDisabled} />
      </div>
      <button className={styles.button} {...getToggleProps()}>
        {selected.length} selected
      </button>
      {open && (
        <div
          ref={listRef}
          className={clsx(styles.multiDropdown, styles.noScroll)}
          {...getListProps()}
        >
          <div
            className={clsx(
              customStyles.multiInputWrap,
              disabled && customStyles.multiInputWrapDisabled
            )}
          >
            {selected.map((tag) => (
              <div className={clsx(styles.tag, disabled && styles.tagDisabled)} key={tag}>
                {tag}
                <button
                  type="button"
                  tabIndex={-1}
                  disabled={disabled}
                  aria-label={`Remove ${tag}`}
                  className={clsx(
                    styles.removeTag,
                    !disabled && isTagActive(tag) && styles.removeTagActive
                  )}
                  onClick={() => removeSelect(tag)}
                >
                  <ClearIcon />
                </button>
              </div>
            ))}
            <div className={styles.multiInputWrap}>
              <input
                className={clsx(styles.multiInput, !isInputActive && styles.inputInactive)}
                placeholder="Type..."
                {...getInputProps()}
              />
              {!isInputEmpty && (
                <button className={styles.clear} {...getClearProps()}>
                  <ClearIcon />
                </button>
              )}
            </div>
          </div>

          <ul className={clsx(styles.dropdownList, styles.scroll)}>
            {items.length ? (
              items.map((item, index) => {
                const checked = isItemSelected(item);
                return (
                  <li
                    className={clsx(
                      styles.itemCheckable,
                      focusIndex === index && styles.focused,
                      checked && styles.checked
                    )}
                    key={item}
                    {...getItemProps({ item, index })}
                  >
                    {item}
                    {checked && <Check />}
                  </li>
                );
              })
            ) : (
              <li className={styles.noResult}>No options</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export { MultiSelectDropdown };
