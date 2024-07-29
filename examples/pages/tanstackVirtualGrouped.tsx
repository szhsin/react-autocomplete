import React, { useEffect, useRef, useState } from 'react';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import { useVirtualizer } from '@tanstack/react-virtual';
import styles from '@/styles/Home.module.css';

const items = new Array(100000).fill(0).map((_, i) => `Item ${i}`);
const isGroupHead = (index: number) => index % 100 === 0;

export default function Home() {
  const [value, setValue] = useState<string | undefined>();
  const [selected, setSelected] = useState<string | undefined>();
  const filteredItems = value
    ? items.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
    : items;

  const parentRef = useRef(null);
  const { scrollToIndex, scrollToOffset, getTotalSize, getVirtualItems } = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => (isGroupHead(index) ? 50 : 22.5),
    overscan: 5
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
    selected,
    onSelectChange: setSelected,
    feature: autocomplete({ rovingText: false, select: true }),
    items: filteredItems
  });

  useEffect(() => {
    if (open) {
      if (focusIndex >= 0) scrollToIndex(focusIndex);
      else scrollToOffset(0);
    }
  }, [focusIndex, open, scrollToIndex, scrollToOffset]);

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
        className={styles.list}
        ref={parentRef}
        style={{
          position: 'absolute',
          border: '1px solid',
          width: 150,
          display: open && filteredItems.length ? 'block' : 'none'
        }}
      >
        <div
          style={{
            height: `${getTotalSize()}px`,
            width: '100%',
            position: 'relative'
          }}
        >
          {getVirtualItems().map((virtualRow) => {
            const index = virtualRow.index;
            const item = filteredItems[index];
            const virtualItemStyle: React.CSSProperties = {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: isGroupHead(index) ? 50 : 22.5,
              transform: `translateY(${virtualRow.start}px)`
            };

            const getItemToRender = (style?: React.CSSProperties) => (
              <div
                key={style ? index : undefined}
                className={styles.option}
                style={{
                  ...style,
                  textDecoration: selected === item ? 'underline' : 'none',
                  background: focusIndex === index ? '#0a0' : 'none'
                }}
                {...getItemProps({ item, index })}
                ref={null}
              >
                {item}
              </div>
            );

            return isGroupHead(index) ? (
              <div key={index} style={virtualItemStyle}>
                <div>
                  <h4 style={{ color: 'lightskyblue', margin: 0 }}>{index}</h4>
                </div>
                {getItemToRender()}
              </div>
            ) : (
              getItemToRender(virtualItemStyle)
            );
          })}
        </div>
      </ul>
    </div>
  );
}
