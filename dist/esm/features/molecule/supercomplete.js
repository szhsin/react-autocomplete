import { mergeModules } from '../../utils/mergeModules.js';
import { autocomplete } from './autocomplete.js';
import { autoInline } from '../atom/autoInline.js';

const supercomplete = props => mergeModules(autocomplete({
  ...props,
  rovingText: true
}), autoInline(props));

export { supercomplete };
