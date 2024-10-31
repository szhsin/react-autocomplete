import { useState } from 'react';
import { clsx } from 'clsx';
import { useCombobox, autocompleteLite } from '@szhsin/react-autocomplete';
import ClearIcon from '@site/static/img/x.svg';
import styles from './styles.module.css';

const FRUITS = ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Pineapple', 'Strawberry'];

const Autocomplete = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const items = value
    ? FRUITS.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    : FRUITS;

  const {
    getInputProps,
    getClearProps,
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
    feature: autocompleteLite({ select: true })
  });

  return (
    <div>
      <div className={styles.inputWrap}>
        <input className={styles.input} placeholder="Pick a fruit..." {...getInputProps()} />
        {!isInputEmpty && (
          <button className={styles.clear} {...getClearProps()}>
            <ClearIcon />
          </button>
        )}
      </div>

      <ul
        className={styles.list}
        {...getListProps()}
        style={{
          display: open ? 'block' : 'none',
          position: 'absolute'
        }}
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

export default Autocomplete;
