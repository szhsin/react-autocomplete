import React, { useEffect, useRef, useState } from 'react';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import { FixedSizeList as List } from 'react-window';
import styles from '@/styles/Home.module.css';

const items = new Array(100000).fill(0).map((_, i) => `Item ${i + 1}`);

type GetItemProps = ReturnType<ReturnType<typeof autocomplete<string>>>['getItemProps'];

interface ItemData {
  getItemProps: GetItemProps;
  focusIndex: number;
  selected: string | undefined;
  items: string[];
}

const Item = ({
  index,
  style,
  data: { getItemProps, items, focusIndex, selected }
}: {
  index: number;
  style: React.CSSProperties;
  data: ItemData;
}) => {
  const item = items[index];
  const { ref, ...itemProps } = getItemProps({ item, index });
  return (
    <li
      className={styles.option}
      style={{
        ...style,
        textDecoration: selected === item ? 'underline' : 'none',
        background: focusIndex === index ? '#0a0' : 'none'
      }}
      {...itemProps}
    >
      {item}
    </li>
  );
};

export default function Home() {
  const [value, setValue] = useState<string | undefined>();
  const [selected, setSelected] = useState<string | undefined>();
  const listRef = useRef<List<ItemData>>(null);
  const filteredItems = value
    ? items.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    : items;

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
    selected,
    onSelectChange: setSelected,
    feature: autocomplete({ rovingText: true, select: true }),
    items: filteredItems
  });

  useEffect(() => {
    open && listRef.current?.scrollToItem(focusIndex);
  }, [focusIndex, open]);

  return (
    <div className={styles.wrapper}>
      <div>value: {value}</div>
      <div>selected: {selected}</div>
      <div>focusIndex: {focusIndex}</div>

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

      <ul
        {...getListProps()}
        // className={styles.list}
        style={{
          position: 'absolute',
          border: '1px solid',
          display: open && filteredItems.length ? 'block' : 'none'
        }}
      >
        <List
          ref={listRef}
          itemCount={filteredItems.length}
          width={200}
          height={600}
          itemSize={36}
          itemData={{ getItemProps, items: filteredItems, focusIndex, selected }}
        >
          {Item}
        </List>
        {/* {items.map((item, index) => (
          <li
            className={styles.option}
            key={item}
            style={{
              background: focusItem === item ? '#0a0' : 'none'
            }}
            {...getItemProps({ item, index })}
          >
            {item}
          </li>
        ))} */}
      </ul>
    </div>
  );
}
