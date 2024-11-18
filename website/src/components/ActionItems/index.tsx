import { useState } from 'react';
import { clsx } from 'clsx';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import ClearIcon from '@site/static/img/x.svg';
import ChevronDown from '@site/static/img/chevron-down.svg';
import ChevronUp from '@site/static/img/chevron-up.svg';
import Check from '@site/static/img/check.svg';
import FRUITS from '@site/src/data/fruits';
import styles from '@site/src/css/styles.module.css';
import { useAutoScroll } from '../../utils/useAutoScroll';

type Item = { value: string; creatable?: boolean };

const ActionItems = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<Item>();

  const [fruits, setFruit] = useState(FRUITS);
  const items: Item[] = fruits
    .filter((fruit) => fruit.toLowerCase().includes((value || '').toLowerCase()))
    .map((fruit) => ({ value: fruit }));
  if (value && !items.find((item) => !item.creatable && item.value === value)) {
    items.push({ value, creatable: true });
  }

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
    getItemValue: (item) => item.value,
    isEqual: (a, b) => a?.value === b?.value,
    isItemAction: (item) => !!item.creatable,
    onAction: (item) => {
      if (item.creatable) {
        setSelected({ value: item.value });
        setFruit([item.value, ...fruits]);
      }
    },
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
        Fruit
      </label>

      <div className={styles.inputWrap}>
        <input
          className={styles.input}
          placeholder="Select or create..."
          {...getInputProps()}
        />
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
          items.map((item, index) => {
            const checked = isItemSelected(item);
            return (
              <li
                className={clsx(
                  styles.itemCheckable,
                  focusIndex === index && styles.focused,
                  checked && styles.checked,
                  item.creatable && styles.creatable
                )}
                key={item.value}
                {...getItemProps({ item, index })}
              >
                {item.creatable ? `Create "${item.value}"` : item.value}
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

export { ActionItems };
