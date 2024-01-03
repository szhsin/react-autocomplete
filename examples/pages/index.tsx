import { useState } from 'react';
import { useAutocomplete, autocomplete } from '@szhsin/react-autocomplete';
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
  const items = US_STATES.filter((item) => item.toLowerCase().includes(value.toLowerCase()));

  const {
    getProps,
    state: {
      inputValue: [, setInputValue],
      isOpen: [isOpen],
      focusIndex: [focusIndex]
    }
  } = useAutocomplete({
    items,
    onChange: setValue,
    feature: autocomplete()
  });

  return (
    <div>
      <div>Current value: {value}</div>
      <div>Index: {focusIndex}</div>
      <input {...getProps('input')} />
      <button
        onClick={() => {
          setInputValue('');
          setValue('');
        }}
      >
        Clear
      </button>
      <ul
        style={{
          position: 'absolute',
          border: '1px solid',
          display: isOpen && items.length ? 'block' : 'none'
        }}
      >
        {items.map((item, index) => (
          <li
            className={styles.option}
            key={item}
            style={{ background: focusIndex === index ? '#ccc' : 'none' }}
            {...getProps('item', { index })}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
