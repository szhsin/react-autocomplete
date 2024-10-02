import { autocompleteLite } from '../features/atom/autocompleteLite';
import { dropdownToggle } from '../features/atom/dropdownToggle';
import { multiSelectDropdown } from '../features/molecule/multiSelectDropdown';

test('no options', () => {
  autocompleteLite();
  dropdownToggle();
  multiSelectDropdown();
});
