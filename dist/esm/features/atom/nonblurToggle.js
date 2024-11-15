import { getInputToggleProps } from '../../common.js';

const nonblurToggle = () => ({
  id,
  open,
  setOpen
}) => ({
  getToggleProps: () => ({
    ...getInputToggleProps(id, open),
    onClick: () => setOpen(!open)
  })
});

export { nonblurToggle };
