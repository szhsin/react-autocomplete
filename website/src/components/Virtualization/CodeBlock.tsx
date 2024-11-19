import { useState, useRef, useEffect } from 'react';
import { useCombobox, autocomplete } from '@szhsin/react-autocomplete';
import { useVirtualizer } from '@tanstack/react-virtual';

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
    <div>
      <label {...getLabelProps()} {...getFocusCaptureProps()}>
        Virtualization
      </label>

      <div>
        <input placeholder="Type a number..." {...getInputProps()} />
        {!isInputEmpty && <button {...getClearProps()}>X</button>}
        <button {...getToggleProps()}>{open ? '↑' : '↓'}</button>
      </div>

      <div
        ref={parentRef}
        {...getListProps()}
        style={{
          display: open ? 'block' : 'none',
          position: 'absolute',
          color: '#000',
          background: '#fff',
          overflow: 'auto',
          maxHeight: 300,
          width: 150
        }}
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
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: size,
                    transform: `translateY(${start}px)`,
                    background: focusIndex === index ? '#ddd' : 'none',
                    textDecoration: selected === item ? 'underline' : 'none'
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
          <div>No options</div>
        )}
      </div>
    </div>
  );
};

export default Virtualization;
