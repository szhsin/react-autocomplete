# React-Autocomplete

> A modular, lightweight, and headless solution.

**[Examples and Docs](https://szhsin.github.io/react-autocomplete/)**

[![NPM](https://img.shields.io/npm/v/@szhsin/react-autocomplete.svg)](https://www.npmjs.com/package/@szhsin/react-autocomplete)
[![NPM](https://img.shields.io/bundlephobia/minzip/@szhsin/react-autocomplete)](https://bundlephobia.com/package/@szhsin/react-autocomplete)

`npm install @szhsin/react-autocomplete`

## Intro

### What's the problem?

- You require an autocomplete/select/search feature for your website, and you want it to be accessible.
- You begin by building one from scratch, but quickly realize that the implementation is not trivial.
- While searching for open-source alternatives, you find that many have significant bundle sizes, typically ranging from **10kB to 50kB**[^1], and some do not support tree shaking.
- Furthermore, these options often do not offer the level of customization you need.

### What makes this solution unique?

- **Modular**: We carefully design the API with a modular approach, providing a no-frills solution that allows you to bundle only the code you need for your website. _No more and no less!_

- **Lightweight**: At just [1.4 kB](https://bundlejs.com/?q=%40szhsin%2Freact-autocomplete&bundle&treeshake=%5B%7B+useCombobox%2CautocompleteLite+%7D%5D&config=%7B%22esbuild%22%3A%7B%22external%22%3A%5B%22react%22%5D%7D%7D)[^2], you get a fully functional and accessible autocomplete solution in React. It's almost negligible in size and likely lighter than creating one from scratch, so you can adopt it without hesitation.

- **Customizable**: Thanks to the modular design, you can easily customize existing features or even create your own feature (a plugin-style module) to enhance the solution.

### Sounds promising! How does it look?

Here’s a live example of the [1.4 kB](https://bundlejs.com/?q=%40szhsin%2Freact-autocomplete&bundle&treeshake=%5B%7B+useCombobox%2CautocompleteLite+%7D%5D&config=%7B%22esbuild%22%3A%7B%22external%22%3A%5B%22react%22%5D%7D%7D) accessible React autocomplete: **[open in CodeSandbox](https://codesandbox.io/p/sandbox/autocompletelite-wf757s)**

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

**[Visit the site for examples and docs](https://szhsin.github.io/react-autocomplete/)**

[^1]: Referring to traditional solutions such as [react-select](https://bundlephobia.com/package/react-select) and [downshift](https://bundlephobia.com/package/downshift).

[^2]: Using the `autocompleteLite` feature.
