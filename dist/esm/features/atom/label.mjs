import { getId } from '../../common.mjs';

const label = () => ({
  id
}) => {
  const inputId = getId(id, 'i');
  const labelId = getId(id, 'a');
  return {
    getLabelProps: () => ({
      id: labelId,
      htmlFor: inputId
    }),
    getInputProps: () => ({
      id: inputId
    }),
    getListProps: () => ({
      'aria-labelledby': labelId
    })
  };
};

export { label };
