import { useState } from 'react';
import { clsx } from 'clsx';
import { useCombobox, autocompleteLite } from '@szhsin/react-autocomplete';
import ClearIcon from '@site/static/img/x.svg';
import { RadioButton } from '../Radio';
import { useAutoScroll } from '../../utils/useAutoScroll';
import styles from '@site/src/css/styles.module.css';
import customStyles from './styles.module.css';

const FRUITS = ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Pineapple', 'Strawberry'];

type Mode = 'select' | 'free';

const Intro = () => {
  const [mode, setMode] = useState<Mode>('select');
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const items = value
    ? FRUITS.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    : FRUITS;
  const isSelectMode = mode === 'select';

  const {
    getInputProps,
    getClearProps,
    getListProps,
    getItemProps,
    open,
    focusIndex,
    isInputEmpty,
    inputRef
  } = useCombobox({
    items,
    value,
    onChange: setValue,
    feature: autocompleteLite({ select: isSelectMode }),
    ...(isSelectMode && {
      selected,
      onSelectChange: setSelected
    })
  });

  const listRef = useAutoScroll(open, items);

  const handleModeChange = (mode: Mode) => {
    setMode(mode);
    setValue(undefined);
    setSelected(undefined);
    inputRef.current.focus();
  };

  return (
    <div>
      <div className={customStyles.modes}>
        <RadioButton
          name="mode"
          value="select"
          label="Select mode"
          groupValue={mode}
          onChange={handleModeChange}
        />
        <RadioButton
          name="mode"
          value="free"
          label="Free mode"
          groupValue={mode}
          onChange={handleModeChange}
        />
      </div>
      <div className={customStyles.inputWrap}>
        <input
          className={styles.input}
          placeholder={isSelectMode ? 'Pick a fruit...' : 'Type to search...'}
          {...getInputProps()}
        />
        {!isInputEmpty && (
          <button className={clsx(styles.iconBtn, customStyles.clear)} {...getClearProps()}>
            <ClearIcon />
          </button>
        )}
      </div>

      <ul
        ref={listRef}
        className={clsx(styles.list, styles.noScroll)}
        {...getListProps()}
        style={{ display: open ? 'block' : 'none' }}
      >
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
          <li className={styles.noResult}>No results</li>
        )}
      </ul>
    </div>
  );
};

export { Intro };
