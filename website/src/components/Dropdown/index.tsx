import { useState } from 'react';
import { clsx } from 'clsx';
import { useCombobox, dropdown } from '@szhsin/react-autocomplete';
import ClearIcon from '@site/static/img/x.svg';
import STATES from '@site/src/data/states';
import styles from '@site/src/css/styles.module.css';
import { Checkbox } from '../Checkbox';
import { useAutoScroll } from '../../utils/useAutoScroll';

const Dropdown = () => {
  const [rovingText, setRovingText] = useState(false);
  const [closeOnSelect, setCloseOnSelect] = useState(true);
  const [flipOnSelect, setFlipOnSelect] = useState(true);

  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const items = value
    ? STATES.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
    : STATES;

  const {
    getInputProps,
    getClearProps,
    getToggleProps,
    getListProps,
    getItemProps,
    open,
    focusIndex,
    isInputEmpty
  } = useCombobox({
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    flipOnSelect,
    feature: dropdown({
      rovingText,
      closeOnSelect
    })
  });

  const listRef = useAutoScroll<HTMLDivElement>(open, items);

  return (
    <div className={styles.wrap}>
      <div className={styles.options}>
        <Checkbox label="flipOnSelect" checked={flipOnSelect} onChange={setFlipOnSelect} />
        <Checkbox label="rovingText" checked={rovingText} onChange={setRovingText} />
        <Checkbox label="closeOnSelect" checked={closeOnSelect} onChange={setCloseOnSelect} />
      </div>

      <button className={styles.button} {...getToggleProps()}>
        {selected || 'Select a state'}
      </button>

      {open && (
        <div
          ref={listRef}
          className={clsx(styles.dropdown, styles.noScroll)}
          {...getListProps()}
        >
          <div className={styles.inputWrap}>
            <input
              className={clsx(styles.input, styles.inputBorderless)}
              placeholder="Type to search..."
              {...getInputProps()}
            />
            {!isInputEmpty && (
              <button className={styles.dropdownClear} {...getClearProps()}>
                <ClearIcon />
              </button>
            )}
          </div>
          <ul className={clsx(styles.dropdownList, styles.scroll)}>
            {items.length ? (
              items.map((item, index) => (
                <li
                  className={clsx(
                    styles.item,
                    focusIndex === index && styles.focused,
                    selected === item && styles.selected
                  )}
                  key={item}
                  {...getItemProps({ item, index })}
                >
                  {item}
                </li>
              ))
            ) : (
              <li className={styles.noResult}>No options</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export { Dropdown };
