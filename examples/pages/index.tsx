import { useState, useEffect } from 'react';
import {
  useAutocomplete,
  autocomplete,
  Feature,
  supercomplete,
  linearTraversal
} from '@szhsin/react-autocomplete';
import styles from '@/styles/Home.module.css';

const US_STATES = [
  { name: 'Alabama', code: 'al' },
  { name: 'Alaska', code: 'as' },
  { name: 'California', code: 'ca' },
  { name: 'Colorado', code: 'co' },
  { name: 'Connecticut', code: 'ct' }
];

const getItemValue = (item: (typeof US_STATES)[number]) => item.name;
const isItemDisabled = ({ code }: { code: string }) => code === 'ca';

// const US_STATES = [
//   'Alabama',
//   'Alaska',
//   'Arizona',
//   'Arkansas',
//   'California',
//   'Colorado',
//   'Connecticut',
//   'Delaware',
//   'Florida',
//   'Georgia',
//   'Hawaii',
//   'Idaho',
//   'Illinois',
//   'Indiana',
//   'Iowa',
//   'Kansas',
//   'Kentucky',
//   'Louisiana',
//   'Maine',
//   'Maryland',
//   'Massachusetts',
//   'Michigan',
//   'Minnesota',
//   'Mississippi',
//   'Missouri',
//   'Montana',
//   'Nebraska',
//   'Nevada',
//   'New Hampshire',
//   'New Jersey',
//   'New Mexico',
//   'New York',
//   'North Carolina',
//   'North Dakota',
//   'Ohio',
//   'Oklahoma',
//   'Oregon',
//   'Pennsylvania',
//   'Rhode Island',
//   'South Carolina',
//   'South Dakota',
//   'Tennessee',
//   'Texas',
//   'Utah',
//   'Vermont',
//   'Virginia',
//   'Washington',
//   'West Virginia',
//   'Wisconsin',
//   'Wyoming'
// ];

export default function Home() {
  const [value, setValue] = useState('');
  const items = US_STATES.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()));
  // const [myinput, setmyinput] = useState('');
  // const [items, setItems] = useState(US_STATES);
  const feature = supercomplete<{ name: string; code: string }>();

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
    onChange: (value) => {
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
        style={{
          position: 'absolute',
          border: '1px solid',
          display: open && items.length ? 'block' : 'none'
        }}
      >
        <div>Header</div>
        {items.map((item) => (
          <li
            className={isItemDisabled(item) ? styles.disabled : styles.option}
            key={item.code}
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
