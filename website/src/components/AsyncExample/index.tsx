import { useState } from 'react';
import { clsx } from 'clsx';
import { useCombobox, autocompleteLite } from '@szhsin/react-autocomplete';
import { RadioButton } from '../Radio';
import ClearIcon from '@site/static/img/x.svg';
import STATES from '@site/src/data/states';
import styles from '@site/src/css/styles.module.css';
import customStyles from '../Intro/styles.module.css';
import { useAutoScroll } from '../../utils/useAutoScroll';

type Mode = 'select' | 'free';

let id = 0;
const fetchData = (value?: string) => {
  clearTimeout(id);
  if (!value || !value.trim()) return;

  return new Promise<string[]>((res) => {
    id = window.setTimeout(
      () =>
        res(STATES.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim()))),
      500
    );
  });
};

const AsyncExample = () => {
  const [mode, setMode] = useState<Mode>('select');

  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const [items, setItems] = useState<string[]>();

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
    items: items || [],
    value,
    onChange: async (newValue) => {
      setValue(newValue);
      setItems(await fetchData(newValue));
    },
    selected,
    onSelectChange: setSelected,
    feature: autocompleteLite({ select: mode === 'select' })
  });

  const listRef = useAutoScroll(open, items || []);

  const handleModeChange = (mode: Mode) => {
    setMode(mode);
    setValue(undefined);
    setSelected(undefined);
    setItems(undefined);
    inputRef.current?.focus();
  };

  return (
    <div className={styles.wrap}>
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
        <input className={styles.input} placeholder="Type to search..." {...getInputProps()} />
        {!isInputEmpty && (
          <button className={clsx(styles.iconBtn, customStyles.clear)} {...getClearProps()}>
            <ClearIcon />
          </button>
        )}
      </div>

      {open && items && (
        <ul ref={listRef} className={clsx(styles.list, styles.scroll)} {...getListProps()}>
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
      )}
    </div>
  );
};

export { AsyncExample };
