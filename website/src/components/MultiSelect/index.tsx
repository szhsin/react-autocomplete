import { useState } from 'react';
import { clsx } from 'clsx';
import { useMultiSelect, multiSelect } from '@szhsin/react-autocomplete';
import ClearIcon from '@site/static/img/x.svg';
import ChevronDown from '@site/static/img/chevron-down.svg';
import ChevronUp from '@site/static/img/chevron-up.svg';
import Check from '@site/static/img/check.svg';
import STATES from '@site/src/data/states';
import styles from '@site/src/css/styles.module.css';
import customStyles from './styles.module.css';
import { Checkbox } from '../Checkbox';
import { useAutoScroll } from '../../utils/useAutoScroll';

const MultiSelect = () => {
  const [rovingText, setRovingText] = useState(true);
  const [closeOnSelect, setCloseOnSelect] = useState(true);
  const [flipOnSelect, setFlipOnSelect] = useState(false);

  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string[]>(['Alaska', 'Florida']);
  const items = value
    ? STATES.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
    : STATES;

  const {
    getLabelProps,
    getFocusCaptureProps,
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
    focused,
    isInputEmpty
  } = useMultiSelect({
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    flipOnSelect,
    feature: multiSelect({ rovingText, closeOnSelect })
  });

  const listRef = useAutoScroll(open, items);

  return (
    <div className={styles.wrap}>
      <div className={styles.options}>
        <Checkbox label="rovingText" checked={rovingText} onChange={setRovingText} />
        <Checkbox label="closeOnSelect" checked={closeOnSelect} onChange={setCloseOnSelect} />
        <Checkbox label="flipOnSelect" checked={flipOnSelect} onChange={setFlipOnSelect} />
      </div>
      <label className={styles.label} {...getLabelProps()} {...getFocusCaptureProps()}>
        State
      </label>
      <div
        className={clsx(
          customStyles.multiInputRoot,
          focused && customStyles.multiInputRootFocused
        )}
        {...getFocusCaptureProps()}
      >
        <div className={customStyles.multiInputWrap}>
          {selected.map((tag) => (
            <div className={styles.tag} key={tag}>
              {tag}
              <span
                className={clsx(styles.removeTag, isTagActive(tag) && styles.removeTagActive)}
                onClick={() => removeSelect(tag)}
              >
                <ClearIcon />
              </span>
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
        <button className={styles.toggle} {...getToggleProps()}>
          {open ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      <ul
        ref={listRef}
        className={clsx(styles.multiList, styles.scroll)}
        {...getListProps()}
        style={{ display: open ? 'block' : 'none' }}
      >
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
  );
};

export { MultiSelect };
