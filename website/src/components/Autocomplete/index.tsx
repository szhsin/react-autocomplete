import { useState } from 'react';
import { clsx } from 'clsx';
import { useCombobox, autocomplete, supercomplete } from '@szhsin/react-autocomplete';
import ClearIcon from '@site/static/img/x.svg';
import ChevronDown from '@site/static/img/chevron-down.svg';
import ChevronUp from '@site/static/img/chevron-up.svg';
import STATES from '@site/src/data/states';
import styles from '@site/src/css/styles.module.css';
import customStyles from './styles.module.css';
import { Checkbox } from '../Checkbox';
import { RadioButton } from '../Radio';
import { useAutoScroll } from '../../utils/useAutoScroll';

type Mode = 'select' | 'free';

const filterItems = (value?: string) =>
  value ? STATES.filter((item) => item.toLowerCase().startsWith(value.toLowerCase())) : STATES;

const Autocomplete = ({ isSupercomplete }: { isSupercomplete: boolean }) => {
  const [mode, setMode] = useState<Mode>('free');
  const [rovingText, setRovingText] = useState(true);
  const [deselectOnClear, setDeselectOnClear] = useState(true);
  const [deselectOnChange, setDeselectOnChange] = useState(true);
  const [closeOnSelect, setCloseOnSelect] = useState(true);
  const isSelectMode = mode === 'select';

  const [value, setValue] = useState<string>();
  const [selected, setSelected] = useState<string>();
  const items = filterItems(value);

  const featureProps = {
    select: isSelectMode,
    deselectOnClear,
    deselectOnChange,
    closeOnSelect
  };

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
    isInputEmpty,
    inputRef
  } = useCombobox({
    items,
    value,
    onChange: setValue,
    selected,
    onSelectChange: setSelected,
    feature: isSupercomplete
      ? supercomplete({
          ...featureProps,
          onRequestItem: ({ value: newValue }, res) => {
            const items = filterItems(newValue);
            if (items.length > 0) res({ index: 0, item: items[0] });
          }
        })
      : autocomplete({
          ...featureProps,
          rovingText
        })
  });

  const listRef = useAutoScroll(open, items);

  const handleModeChange = (mode: Mode) => {
    inputRef.current?.focus();
    setMode(mode);
    setValue(undefined);
    setSelected(undefined);
    setRovingText(mode === 'free');
    setDeselectOnClear(true);
    setCloseOnSelect(true);
    setDeselectOnChange(true);
  };

  return (
    <div className={styles.wrap}>
      <div className={customStyles.modes}>
        <RadioButton
          name="mode"
          value="free"
          label="Free mode"
          groupValue={mode}
          onChange={handleModeChange}
        />
        <div className={customStyles.desc}>
          <i>(the default setting)</i> The text entered in the input field is not restricted to
          the items in the dropdown list.
        </div>
        <RadioButton
          name="mode"
          value="select"
          label="Select mode"
          groupValue={mode}
          onChange={handleModeChange}
        />
        <div className={customStyles.desc}>
          The allowed text in the input field is restricted to the items in the dropdown list.
        </div>
      </div>
      <div className={styles.options}>
        {!isSupercomplete && (
          <Checkbox label="rovingText" checked={rovingText} onChange={setRovingText} />
        )}
        <Checkbox
          label="deselectOnClear"
          checked={deselectOnClear}
          onChange={setDeselectOnClear}
        />
        {!isSelectMode && (
          <Checkbox
            label="deselectOnChange"
            checked={deselectOnChange}
            onChange={setDeselectOnChange}
          />
        )}
        <Checkbox label="closeOnSelect" checked={closeOnSelect} onChange={setCloseOnSelect} />
      </div>
      <label className={styles.label} {...getLabelProps()} {...getFocusCaptureProps()}>
        State
      </label>
      <div className={customStyles.inputWrap}>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            placeholder="Select or type..."
            {...getInputProps()}
          />
          {!isInputEmpty && (
            <button className={styles.clear} {...getClearProps()}>
              <ClearIcon />
            </button>
          )}
          <button className={styles.toggle} {...getToggleProps()}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
        {selected && (
          <div className={customStyles.info}>
            You have selected: <b>{selected}</b>
          </div>
        )}
      </div>

      <ul
        ref={listRef}
        className={clsx(styles.list, styles.scroll)}
        {...getListProps()}
        style={{ display: open ? 'block' : 'none' }}
      >
        {items.length ? (
          items.map((item, index) => (
            <li
              className={clsx(
                styles.item,
                focusIndex === index && styles.focused,
                selected === item && styles.selected
              )}
              key={item}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))
        ) : (
          <li className={styles.noResult}>No results</li>
        )}
      </ul>
    </div>
  );
};

export { Autocomplete };
