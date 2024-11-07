import { clsx } from 'clsx';
import Unchecked from '@site/static/img/square.svg';
import Checked from '@site/static/img/square-check.svg';
import styles from './styles.module.css';

const Checkbox = ({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <label className={clsx(styles.label, checked && styles.checked)}>
      <input
        className={styles.input}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {checked ? <Checked className={styles.icon} /> : <Unchecked className={styles.icon} />}
      {label}
    </label>
  );
};

export { Checkbox };
