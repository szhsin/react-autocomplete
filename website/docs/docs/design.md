---
sidebar_position: 2
---

# Design Concept

The API consists of a main React hook and a feature that work together under a defined contract.

### Main hook

**useCombobox/useMultiSelect** - acts as the primary entry point, utilizing a classic headless React hook style API. It manages state and data, and must connect with a _feature_ to deliver the required functionalities.

### Feature (a JavaScript module)

A feature implements the desired functionalities (behavior), such as `autocomplete` or `multiSelect`. There are two types of features:

- **Atom**: A minimal, indivisible unit that can function independently or be combined into larger features.
- **Molecule**: Composed of two or more atoms or other molecules, providing more advanced features.

One advantage of this architecture is you can easily combine any number of atoms or molecules to create the feature you need, as long as the resulting feature conforms to the same contract.
