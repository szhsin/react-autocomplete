# React-Autocomplete

> A modular, lightweight, and headless solution.

**[Examples and Docs](https://szhsin.github.io/react-autocomplete/)**

[![NPM](https://img.shields.io/npm/v/@szhsin/react-autocomplete.svg)](https://www.npmjs.com/package/@szhsin/react-autocomplete) [![NPM](https://img.shields.io/bundlephobia/minzip/@szhsin/react-autocomplete)](https://bundlephobia.com/package/@szhsin/react-autocomplete)

`npm install @szhsin/react-autocomplete`

## Intro

### What's the problem?

- You require an autocomplete/select/search feature for your website, and you want it to be accessible.
- You begin by building one from scratch, but quickly realize that the implementation is not trivial.
- While searching for open-source alternatives, you find that many have significant bundle sizes, typically ranging from [10kB to 50kB](#bundle-size-comparison), and some do not support tree shaking.
- Furthermore, these options often do not offer the level of customization you need.

### What makes this solution unique?

- **Modular**: We carefully design the API with a modular approach, providing a no-frills solution that allows you to bundle only the code you need for your website. _No more and no less!_

- **Lightweight**: At just [1.4 kB](https://bundlejs.com/?q=%40szhsin%2Freact-autocomplete&treeshake=%5B%7B+useCombobox%2CautocompleteLite+%7D%5D&config=%7B%22esbuild%22%3A%7B%22external%22%3A%5B%22react%22%5D%7D%7D)[^1], you get a fully functional and accessible autocomplete solution in React. It's almost negligible in size and likely lighter than creating one from scratch, so you can adopt it without hesitation.

- **Customizable**: Thanks to the modular design, you can easily customize existing features or even create your own feature (a plugin-style module) to enhance the solution.

### Sounds promising! How does it look?

Here’s a live example of the 1.4kB accessible React autocomplete: **[open in CodeSandbox](https://codesandbox.io/p/sandbox/autocompletelite-wf757s)**

## Bundle size comparison

| Package | Size (min+gzip) | Size vs base |
| --- | --- | --- |
| **@szhsin/react-autocomplete** | [2.62kB](https://bundlejs.com/?q=%40szhsin%2Freact-autocomplete&treeshake=%5B*%5D&config=%7B"esbuild"%3A%7B"external"%3A%5B"react"%2C"react-dom"%5D%7D%7D) | **1× (base)** |
| [downshift](https://www.downshift-js.com/) | [12.3kB](https://bundlejs.com/?q=downshift&treeshake=%5B*%5D&config=%7B"esbuild"%3A%7B"external"%3A%5B"react"%2C"react-dom"%5D%7D%7D) | 4.7× larger |
| [@ariakit/react](https://ariakit.org/components/combobox) | [33.1kB](https://bundlejs.com/?q=%40ariakit%2Freact&treeshake=%5B%7B+Combobox%2CComboboxItem%2CComboboxProvider%2CComboboxPopover+%7D%5D&config=%7B%22esbuild%22%3A%7B%22external%22%3A%5B%22react%22%2C%22react-dom%22%5D%7D%7D) | 12.6× larger |
| [@headlessui/react](https://headlessui.com/react/combobox) | [40.3kB](https://bundlejs.com/?q=%40headlessui%2Freact&treeshake=%5B%7B+Combobox%2CComboboxButton%2CComboboxInput%2CComboboxOption%2CComboboxOptions+%7D%5D&config=%7B%22esbuild%22%3A%7B%22external%22%3A%5B%22react%22%2C%22react-dom%22%5D%7D%7D) | 15.4× larger |
| [@base-ui/react](https://base-ui.com/react/components/autocomplete) | [48.2kB](https://bundlejs.com/?q=%40base-ui%2Freact%2Fautocomplete&treeshake=%5B%7B+Autocomplete+%7D%5D&config=%7B"esbuild"%3A%7B"external"%3A%5B"react"%2C"react-dom"%5D%7D%7D) | 18.4× larger |
| [react-aria](https://react-aria.adobe.com/ComboBox) | [50.7kB](https://bundlejs.com/?q=react-aria-components&treeshake=%5B%7B+ComboBox+%7D%5D&config=%7B%22esbuild%22%3A%7B%22external%22%3A%5B%22react%22%2C%22react-dom%22%5D%7D%7D) | 19.3× larger |

## Design Concept

The API consists of a main React hook and a feature that work together under a defined contract.

### Main hook

**useCombobox/useMultiSelect** - acts as the primary entry point, utilizing a classic headless React hook style API. It manages state and data, and must connect with a _feature_ to deliver the required functionalities.

### Feature (A replaceable module)

A feature implements the desired functionalities (behavior), such as `autocomplete` or `multiSelect`. There are two types of features:

- [Atom](https://github.com/szhsin/react-autocomplete/tree/master/src/features/atom): A minimal, indivisible unit that can function independently or be combined into larger features.
- [Molecule](https://github.com/szhsin/react-autocomplete/tree/master/src/features/molecule): Composed of two or more atoms or other molecules, providing more advanced features.

One advantage of this architecture is you can easily combine any number of atoms or molecules to create the feature you need, as long as the resulting feature conforms to the same contract.

## Supported features

- Autocomplete (Combobox)
- Supercomplete ([Inline text completion](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-both/))
- Dropdown with autocomplete
- Multiple selection
- Multiple selection in dropdown
- Select-only Combobox

**[Visit the site for examples and docs](https://szhsin.github.io/react-autocomplete/docs/features/autocomplete/)**

[^1]: Using the `autocompleteLite` feature.
