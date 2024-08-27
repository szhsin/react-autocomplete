import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCombobox, autocomplete, dropdown } from '@szhsin/react-autocomplete';
import { useFloating, autoUpdate } from '@floating-ui/react-dom';
import styles from '@/styles/Home.module.css';
import { US_STATES_PLAIN } from '../data';

function Combobox() {
  const [value, setValue] = useState<string | undefined>();
  const items = value
    ? US_STATES_PLAIN.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
    : US_STATES_PLAIN;

  const { refs, floatingStyles } = useFloating<HTMLInputElement>({
    placement: 'top-end'
  });

  const {
    getInputProps,
    getListProps,
    getItemProps,
    getToggleProps,
    getClearProps,
    open,
    focusIndex,
    isInputEmpty
  } = useCombobox({
    inputRef: refs.reference,
    value,
    onChange: setValue,
    feature: autocomplete(),
    items
  });

  const list = (
    <>
      {open && (
        <ul
          {...getListProps()}
          ref={refs.setFloating}
          className={styles.list}
          style={{
            ...floatingStyles,
            border: '1px solid'
            // display: open && items.length ? 'block' : 'none'
          }}
        >
          <h3>Select a state</h3>
          {items.map((item, index) => (
            <li
              className={styles.option}
              key={item}
              style={{
                background: focusIndex === index ? '#0a0' : 'none'
              }}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return (
    <div className={styles.wrapper}>
      <div style={{ marginLeft: 100, marginTop: 80 }}>
        <div>value: {value}</div>
        <div>focusIndex: {focusIndex}</div>
        <input className={styles.input} {...getInputProps()} ref={refs.setReference} />
        {!isInputEmpty && (
          <button
            type="button"
            className={styles.clearButton}
            style={{ position: 'absolute', transform: 'translate(-120%, 10%)' }}
            {...getClearProps()}
          >
            ❎
          </button>
        )}
        <button type="button" {...getToggleProps()}>
          {open ? '⬆️' : '⬇️'}
        </button>
      </div>

      {typeof document !== 'undefined' ? createPortal(list, document.body) : list}
    </div>
  );
}

function Dropdown() {
  const [value, setValue] = useState<string | undefined>();
  const items = value
    ? US_STATES_PLAIN.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()))
    : US_STATES_PLAIN;

  const { refs, floatingStyles, elements, update } = useFloating<HTMLButtonElement>({
    placement: 'top-end'
  });

  const {
    getInputProps,
    getListProps,
    getItemProps,
    getToggleProps,
    getClearProps,
    open,
    focusIndex,
    isInputEmpty
  } = useCombobox({
    value,
    onChange: setValue,
    feature: dropdown({ toggleRef: refs.reference }),
    items
  });

  useEffect(() => {
    if (open && elements.reference && elements.floating) {
      const cleanup = autoUpdate(elements.reference, elements.floating, update);
      return cleanup;
    }
  }, [open, elements, update]);

  return (
    <div className={styles.wrapper}>
      <div style={{ marginLeft: 100, marginTop: 80 }}>
        <div>value: {value}</div>
        <div>focusIndex: {focusIndex}</div>
        <button {...getToggleProps()} ref={refs.setReference}>
          Select
        </button>
        <div
          {...getListProps()}
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            border: '1px solid',
            display: open ? 'block' : 'none'
          }}
        >
          <div style={{ padding: 10 }}>
            <input className={styles.input} {...getInputProps()} />
            {!isInputEmpty && (
              <button
                type="button"
                className={styles.clearButton}
                style={{ position: 'absolute', transform: 'translate(-120%, 10%)' }}
                {...getClearProps()}
              >
                ❎
              </button>
            )}
            <button type="button" {...getToggleProps()}>
              {open ? '⬆️' : '⬇️'}
            </button>
          </div>

          <ul className={styles.list}>
            {items.map((item, index) => (
              <li
                className={styles.option}
                key={item}
                style={{
                  background: focusIndex === index ? '#0a0' : 'none'
                }}
                {...getItemProps({ item, index })}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function () {
  return (
    <div style={{ display: 'flex', marginTop: 500 }}>
      <Combobox />
      <Dropdown />
    </div>
  );
}
