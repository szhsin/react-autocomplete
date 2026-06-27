import { autocompleteLite } from '../features/atom/autocompleteLite';
import { dropdownToggle } from '../features/atom/dropdownToggle';
import { multiSelectDropdown } from '../features/molecule/multiSelectDropdown';

// eslint-disable-next-line vitest/expect-expect
test('no options', () => {
  autocompleteLite();
  dropdownToggle();
  multiSelectDropdown();
});
