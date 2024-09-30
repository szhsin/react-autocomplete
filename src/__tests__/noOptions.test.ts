import { autocompleteLite } from '../features/atom/autocompleteLite';
import { dropdownToggle } from '../features/atom/dropdownToggle';

test('no options', () => {
  autocompleteLite();
  dropdownToggle();
});
