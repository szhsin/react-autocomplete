import React, { useState } from 'react';
import { clsx } from 'clsx';
import { useCombobox, autocomplete, mergeGroupedItems } from '@szhsin/react-autocomplete';
import ClearIcon from '@site/static/img/x.svg';
import ChevronDown from '@site/static/img/chevron-down.svg';
import ChevronUp from '@site/static/img/chevron-up.svg';
import GROUPED from '@site/src/data/states-grouped';
import styles from '@site/src/css/styles.module.css';

const Grouped = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const groups = value
    ? GROUPED.map(({ initial, states }) => ({
        initial,
        states: states.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      })).filter((group) => group.states.length > 0)
    : GROUPED;

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
    items: mergeGroupedItems({ groups, getItemsInGroup: (group) => group.states }),
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: autocomplete({
      select: true
    })
  });

  let itemIndex = -1;

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
        className={clsx(styles.list, styles.scroll)}
        {...getListProps()}
        style={{ display: open ? 'block' : 'none' }}
      >
        {groups.length ? (
          groups.map(({ initial, states }) => (
            <React.Fragment key={initial}>
              <li className={styles.groupHead}>{initial}</li>
              {states.map((item) => {
                itemIndex++;
                return (
                  <li
                    className={clsx(
                      styles.item,
                      focusIndex === itemIndex && styles.focused,
                      selected === item && styles.selected
                    )}
                    key={item}
                    {...getItemProps({ item, index: itemIndex })}
                  >
                    {item}
                  </li>
                );
              })}
            </React.Fragment>
          ))
        ) : (
          <li className={styles.noResult}>No options</li>
        )}
      </ul>
    </div>
  );
};

export { Grouped };
