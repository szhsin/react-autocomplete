import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import { useVirtualizer } from '@tanstack/react-virtual';
import ClearIcon from '@site/static/img/x.svg';
import ChevronDown from '@site/static/img/chevron-down.svg';
import ChevronUp from '@site/static/img/chevron-up.svg';
import styles from '@site/src/css/styles.module.css';

const DATA = new Array(10000).fill(0).map((_, i) => `${i + 1}`);

const Virtualization = () => {
  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const items = value ? DATA.filter((item) => item.includes(value)) : DATA;

  const parentRef = useRef(null);
  const { scrollToIndex, scrollToOffset, getTotalSize, getVirtualItems } = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 32,
    overscan: 5
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
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: autocomplete({ select: true })
  });

  useEffect(() => {
    if (open) {
      if (focusIndex >= 0) scrollToIndex(focusIndex);
      else scrollToOffset(0);
    }
  }, [open, focusIndex, scrollToIndex, scrollToOffset]);

  return (
    <div className={styles.wrap}>
      <label className={styles.label} {...getLabelProps()} {...getFocusCaptureProps()}>
        Virtualization
      </label>

      <div className={styles.inputWrap}>
        <input className={styles.input} placeholder="Type a number..." {...getInputProps()} />
        {!isInputEmpty && (
          <button className={styles.clear} {...getClearProps()}>
            <ClearIcon />
          </button>
        )}
        <button className={styles.toggle} {...getToggleProps()}>
          {open ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      <div
        ref={parentRef}
        className={clsx(styles.list, styles.scroll)}
        {...getListProps()}
        style={{ display: open ? 'block' : 'none' }}
      >
        {items.length ? (
          <div
            style={{
              height: getTotalSize(),
              width: '100%',
              position: 'relative'
            }}
          >
            {getVirtualItems().map(({ index, size, start }) => {
              const item = items[index];
              return (
                <div
                  className={clsx(
                    styles.item,
                    focusIndex === index && styles.focused,
                    selected === item && styles.selected
                  )}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: size,
                    transform: `translateY(${start}px)`
                  }}
                  key={item}
                  {...getItemProps({ item, index })}
                >
                  {item}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.noResult}>No options</div>
        )}
      </div>
    </div>
  );
};

export { Virtualization };
