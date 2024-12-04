import { mergeModules } from '../../utils/mergeModules.mjs';
import { autocomplete } from './autocomplete.mjs';
import { autoInline } from '../atom/autoInline.mjs';

const supercomplete = props => mergeModules(autocomplete({
  ...props,
  rovingText: true
}), autoInline(props));

export { supercomplete };
