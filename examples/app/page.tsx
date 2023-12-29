'use client';

import { useState } from 'react';
import { useAutocomplete, AutocompleteProps } from '@szhsin/react-autocomplete';
import styles from './page.module.css';

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

const predefinedListProps: (props: {
  value: string;
  onChange: (value: string) => void;
  items: string[];
}) => AutocompleteProps = ({ onChange, items }) => ({
  items,
  onSetInputValue: (newValue, { type }, base) => {
    if (type === 'blur' || type === 'esc') {
      const matchValue = items.find((item) => item === newValue) || '';
      base(matchValue);
    } else {
      base(newValue);
    }
  },
  onChange: (newValue, { type }) => {
    if (type === 'blur' || type === 'esc') {
      const matchValue = items.find((item) => item === newValue) || '';
      onChange(matchValue);
    } else {
      onChange(newValue);
    }
  }
});

const undoOnCancelProps: (props: {
  value: string;
  onChange: (value: string) => void;
  items: string[];
}) => AutocompleteProps = ({ items, value, onChange }) => ({
  items,
  onChange: (newValue, { type }) => {
    if (type !== 'esc') {
      onChange(newValue);
    }
  },
  onSetInputValue: (inputValue, { type }, base) => {
    if (type === 'esc') {
      base(value);
    } else {
      base(inputValue);
    }
  }
});

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
    // items,
    // onChange: setValue,
    // onSetInputValue: (value, { type }, base) => type !== 'nav' && base(value),
    ...predefinedListProps({ value, onChange: setValue, items })
    // ...undoOnCancelProps({ value, onChange: setValue, items })
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
            {...getProps('option', { index })}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
