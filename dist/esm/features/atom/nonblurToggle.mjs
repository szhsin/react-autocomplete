import { getInputToggleProps } from '../../common.mjs';

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
