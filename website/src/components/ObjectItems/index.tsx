import { useState } from 'react';
import { clsx } from 'clsx';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import ClearIcon from '@site/static/img/x.svg';
import ChevronDown from '@site/static/img/chevron-down.svg';
import ChevronUp from '@site/static/img/chevron-up.svg';
import STATES from '@site/src/data/states-obj';
import styles from '@site/src/css/styles.module.css';
import { useAutoScroll } from '../../utils/useAutoScroll';

const ObjectItems = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<{ name: string; abbr: string }>();
  const items = value
    ? STATES.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()))
    : STATES;

  const {
    getFocusCaptureProps,
    getLabelProps,
    getInputProps,
    getClearProps,
    getToggleProps,
    getListProps,
    getItemProps,
    isItemSelected,
    open,
    focusIndex,
    isInputEmpty
  } = useCombobox({
    items,
    getItemValue: (item) => item.name,
    isEqual: (item1, item2) => item1?.abbr === item2?.abbr,
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
        State
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
        className={clsx(styles.list, styles.scroll)}
        {...getListProps()}
        style={{ display: open ? 'block' : 'none' }}
      >
        {items.length ? (
          items.map((item, index) => (
            <li
              className={clsx(
                styles.item,
                focusIndex === index && styles.focused,
                isItemSelected(item) && styles.selected
              )}
              key={item.abbr}
              {...getItemProps({ item, index })}
            >
              {item.name}
            </li>
          ))
        ) : (
          <li className={styles.noResult}>No results</li>
        )}
      </ul>
    </div>
  );
};

export { ObjectItems };
