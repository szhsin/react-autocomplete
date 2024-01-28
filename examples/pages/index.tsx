import { useState, useEffect } from 'react';
import { useAutocomplete, autocomplete, Feature, supercomplete } from '@szhsin/react-autocomplete';
import styles from '@/styles/Home.module.css';

const US_STATES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];

export default function Home() {
  const [value, setValue] = useState('');
  const items = US_STATES.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()));
  // const [myinput, setmyinput] = useState('');
  // const [items, setItems] = useState(US_STATES);

  const { getProps, setInputValue, open, focusIndex, inlineComplete } = useAutocomplete({
    items,
    onChange: (value) => {
      setValue(value);
      const items = US_STATES.filter((item) => item.toLowerCase().startsWith(value.toLowerCase()));
      // setItems(items);
      items.length && inlineComplete({ index: 0, value: items[0] });
    },
    feature: supercomplete()
  });

  // useEffect(() => {
  //   items.length && inlineComplete({ index: 0, value: items[0] });
  // }, [items, inlineComplete]);

  return (
    <div className={styles.wrapper}>
      <div>Current value: {value}</div>
      <div>Index: {focusIndex}</div>
      <input className={styles.input} {...getProps('input')} />

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
        style={{
          position: 'absolute',
          border: '1px solid',
          display: open && items.length ? 'block' : 'none'
        }}
      >
        {items.map((item, index) => (
          <li
            className={styles.option}
            key={item}
            style={{ background: focusIndex === index ? '#0a0' : 'none' }}
            {...getProps('item', { index })}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
