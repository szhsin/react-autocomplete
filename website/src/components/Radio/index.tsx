import { clsx } from 'clsx';
import RadioChecked from '@site/static/img/radio_checked.svg';
import RadioUnchecked from '@site/static/img/radio_unchecked.svg';
import styles from './styles.module.css';

const RadioButton = <T extends string>({
  label,
  name,
  value,
  groupValue,
  onChange
}: {
  label: string;
  name: string;
  value: T;
  groupValue: T;
  onChange: (value: T) => void;
}) => {
  const checked = groupValue === value;
  return (
    <label className={clsx(styles.label, checked && styles.checked)}>
      <input
        className={styles.input}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={({ target }) => target.checked && onChange(target.value as T)}
      />
      {checked ? (
        <RadioChecked className={styles.radio} />
      ) : (
        <RadioUnchecked className={styles.radio} />
      )}
      {label}
    </label>
  );
};

export { RadioButton };
