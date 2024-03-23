import { useState, useEffect } from 'react';
import {
  useAutocomplete,
  autocomplete,
  Feature,
  supercomplete,
  linearTraversal
} from '@szhsin/react-autocomplete';
import styles from '@/styles/Home.module.css';
import { US_STATES_OJB as US_STATES } from './data';

const getItemValue = (item: (typeof US_STATES)[number]) => item.name;
const isItemDisabled = ({ abbr }: { abbr: string }) => abbr === 'CA';

export default function Home() {
  const [value, setValue] = useState('');
  const items = US_STATES.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()));
  // const [myinput, setmyinput] = useState('');
  // const [items, setItems] = useState(US_STATES);
  const feature = supercomplete<{ name: string; abbr: string }>();

  const {
    getInputProps,
    getListProps,
    getItemProps,
    setInputValue,
    open,
    focusItem,
    inlineComplete
  } = useAutocomplete({
    traversal: linearTraversal({
      items,
      traverseInput: true
    }),
    getItemValue,
    isItemDisabled,
    onChange: (value, meta) => {
      console.log('onChange', meta);
      setValue(value);
      const item = US_STATES.filter((item) =>
        item.name.toLowerCase().startsWith(value.toLowerCase())
      ).find((item) => !isItemDisabled(item));
      // setItems(items);
      item && inlineComplete({ item });
    },
    feature
  });

  // useEffect(() => {
  //   items.length && inlineComplete({ index: 0, value: items[0] });
  // }, [items, inlineComplete]);

  return (
    <div className={styles.wrapper}>
      <div>Current value: {value}</div>
      <div>Focus item: {focusItem?.name}</div>
      <input className={styles.input} {...getInputProps()} />

      <button
        onClick={() => {
          setInputValue('');
          // setItems(US_STATES);
          setValue('');
        }}
      >
        Clear
      </button>
      <ul
        {...getListProps()}
        className={styles.list}
        style={{
          position: 'absolute',
          border: '1px solid',
          display: open && items.length ? 'block' : 'none'
        }}
      >
        <h3>US STATES</h3>
        {items.map((item) => (
          <li
            className={isItemDisabled(item) ? styles.disabled : styles.option}
            key={item.abbr}
            style={{ background: focusItem === item ? '#0a0' : 'none' }}
            {...getItemProps({ item })}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
