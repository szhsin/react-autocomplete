import { useState, useRef } from 'react';
import { clsx } from 'clsx';
import { useCombobox, autocomplete, dropdown } from '@szhsin/react-autocomplete';
import { useFloating, autoUpdate, size } from '@floating-ui/react-dom';
import ClearIcon from '@site/static/img/x.svg';
import ChevronDown from '@site/static/img/chevron-down.svg';
import ChevronUp from '@site/static/img/chevron-up.svg';
import STATES from '@site/src/data/states';
import styles from '@site/src/css/styles.module.css';

const Autocomplete = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const items = value
    ? STATES.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    : STATES;

  const { refs, floatingStyles } = useFloating<HTMLInputElement>({
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      size({
        padding: { top: 60, bottom: 16 },
        apply({ availableHeight, elements }) {
          elements.floating.style.maxHeight = `${availableHeight}px`;
        }
      })
    ]
  });

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
    inputRef: refs.reference,
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: autocomplete({ select: true })
  });

  return (
    <div className={styles.wrap} style={{ marginTop: 32 }}>
      <label className={styles.label} {...getLabelProps()} {...getFocusCaptureProps()}>
        State
      </label>

      <div className={styles.inputWrap}>
        <input
          className={styles.input}
          placeholder="Select or type..."
          {...getInputProps()}
          ref={refs.setReference}
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

      {open && (
        <ul
          className={styles.list}
          ref={refs.setFloating}
          {...getListProps()}
          style={{ overflow: 'auto', ...floatingStyles }}
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
            <li className={styles.noResult}>No options</li>
          )}
        </ul>
      )}
    </div>
  );
};

const Dropdown = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const items = value
    ? STATES.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    : STATES;

  const { refs, floatingStyles } = useFloating<HTMLButtonElement>({
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      size({
        padding: { top: 60, bottom: 16 },
        apply({ availableHeight }) {
          if (listRef.current && inputRef.current) {
            listRef.current.style.maxHeight = `${availableHeight - inputRef.current.getBoundingClientRect().height}px`;
          }
        }
      })
    ]
  });

  const {
    getInputProps,
    getClearProps,
    getToggleProps,
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
    selected,
    onSelectChange: setSelected,
    feature: dropdown({ toggleRef: refs.reference })
  });

  return (
    <div className={styles.wrap}>
      <button className={styles.button} {...getToggleProps()} ref={refs.setReference}>
        {selected || 'Select a state'}
      </button>

      {open && (
        <div
          className={styles.dropdown}
          {...getListProps()}
          ref={refs.setFloating}
          style={floatingStyles}
        >
          <div className={styles.inputWrap}>
            <input
              className={styles.inputBorderless}
              placeholder="Type to search..."
              {...getInputProps()}
            />
            {!isInputEmpty && (
              <button className={styles.dropdownClear} {...getClearProps()}>
                <ClearIcon />
              </button>
            )}
          </div>
          <ul ref={listRef} className={clsx(styles.dropdownList, styles.scroll)}>
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

const FloatingUI = () => {
  return (
    <>
      <Autocomplete />
      <Dropdown />
    </>
  );
};

export { FloatingUI };
