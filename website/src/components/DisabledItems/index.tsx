import { useState } from 'react';
import { clsx } from 'clsx';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import ClearIcon from '@site/static/img/x.svg';
import ChevronDown from '@site/static/img/chevron-down.svg';
import ChevronUp from '@site/static/img/chevron-up.svg';
import FRUITS from '@site/src/data/fruits';
import styles from '@site/src/css/styles.module.css';
import { useAutoScroll } from '../../utils/useAutoScroll';

const isItemDisabled = (item: string) => item.includes('berry');

const DisabledItems = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const items = value
    ? FRUITS.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    : FRUITS;

  const {
    getFocusCaptureProps,
    getLabelProps,
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
    isItemDisabled,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: autocomplete({ select: true })
  });

  const listRef = useAutoScroll(open, items);

  return (
    <div className={styles.wrap}>
      <label className={styles.label} {...getLabelProps()} {...getFocusCaptureProps()}>
        Fruit (no berries)
      </label>

      <div className={styles.inputWrap}>
        <input className={styles.input} placeholder="Select or type..." {...getInputProps()} />
        {!isInputEmpty && (
          <button className={styles.clear} {...getClearProps()}>
            <ClearIcon />
          </button>
        )}
        <button className={styles.toggle} {...getToggleProps()}>
          {open ? <ChevronUp /> : <ChevronDown />}
        </button>
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
                selected === item && styles.selected,
                isItemDisabled(item) && styles.disabled
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
  );
};

export { DisabledItems };
