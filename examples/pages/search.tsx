import React, { useState } from 'react';
import { useCombobox, supercomplete } from '@szhsin/react-autocomplete';
import styles from '@/styles/Home.module.css';
import { US_STATES } from '../data';

type Item = { name: string; abbr: string };
const getItemValue = (item: Item) => item.name;

const search = (value: string | undefined) => value && console.log(`Searching for "${value}"`);

export default function Home() {
  const [value, setValue] = useState<string | undefined>();
  const items = value
    ? US_STATES.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()))
    : US_STATES;

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
    onSelectChange: (selected) => search(selected?.name),
    getItemValue,
    value,
    onChange: setValue,
    feature: supercomplete({
      onRequestItem: ({ value: newValue }, res) =>
        res({
          index: 0,
          item: US_STATES.filter((item) =>
            item.name.toLowerCase().startsWith(newValue.toLowerCase())
          )[0]
        })
    }),

    items
  });

  return (
    <div className={styles.wrapper}>
      <div>value: {value}</div>
      <div>focusIndex: {focusIndex}</div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          search(value);
        }}
      >
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
      </form>
      <ul
        {...getListProps()}
        className={styles.list}
        style={{
          position: 'absolute',
          border: '1px solid',
          display: open && items.length ? 'block' : 'none'
        }}
      >
        {items.map((item, index) => (
          <li
            className={styles.option}
            key={item.abbr}
            style={{
              background: focusIndex === index ? '#0a0' : 'none'
            }}
            {...getItemProps({ item, index })}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
