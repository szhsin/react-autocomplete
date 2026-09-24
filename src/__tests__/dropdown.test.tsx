import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './utils/scrollIntoView';
import { Dropdown } from './utils/Dropdown';

describe('dropdown', () => {
  test('disabled toggle and popup controls block interaction', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Dropdown disabled />);
    const toggle = screen.getByRole('button', { name: 'Select' });

    expect(toggle).toBeDisabled();
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).toBeNull();

    rerender(<Dropdown disabled={false} />);
    expect(toggle).toBeEnabled();
    await user.click(toggle);
    const combobox = screen.getByRole('combobox');
    expect(combobox).toBeEnabled();
    await user.type(combobox, 'c');
    expect(combobox).toHaveValue('c');

    rerender(<Dropdown disabled />);
    const clear = screen.getByRole('button', { name: 'Clear' });
    expect(toggle).toBeDisabled();
    expect(combobox).toBeDisabled();
    expect(clear).toBeDisabled();
    await user.click(toggle);
    await user.click(clear);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(combobox).toHaveValue('c');
    expect(screen.getByTestId('value')).toHaveTextContent(/^c$/);

    rerender(<Dropdown disabled={false} />);
    await user.click(clear);
    expect(combobox).toHaveValue('');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
  });

  test('continuous interactions', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Dropdown />);
    const toggle = screen.getByRole('button', { name: 'Select' });
    expect(toggle).toHaveAttribute('type', 'button');
    expect(toggle).toHaveAttribute('aria-haspopup', 'true');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Open by clicking toggle
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('combobox')).toHaveFocus();
    expect(screen.queryByRole('button', { name: 'Clear' })).toBeNull();

    // clicking an element other than options in the listbox
    await user.click(screen.getByTestId('header'));
    expect(screen.getByRole('combobox')).toHaveFocus();
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    // select an option by clicking
    await user.click(screen.getByRole('option', { name: 'Arizona' }));
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Arizona$/);
    await user.click(toggle);
    expect(screen.getByRole('combobox')).toHaveFocus();
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(screen.getByRole('option', { name: 'Arizona' })).toHaveStyle({
      textDecoration: 'underline'
    });
    expect(screen.getByRole('option', { name: 'Arizona' })).toHaveAttribute(
      'aria-selected',
      'true'
    );

    // type a character and select with keyboard
    await user.keyboard('c');
    await user.keyboard('{Enter}'); // should do nothing
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('c');
    expect(screen.getByTestId('value')).toHaveTextContent(/^c$/);
    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('option', { name: 'Connecticut' })).toHaveStyle({
      backgroundColor: 'red'
    });
    await user.keyboard('{Enter}');
    expect(toggle).toHaveFocus();
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Connecticut$/);

    // Press arrow down key to open
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('combobox')).toHaveFocus();
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(screen.getByRole('option', { name: 'Connecticut' })).toHaveStyle({
      textDecoration: 'underline'
    });

    // Press ESC to close
    await user.keyboard('{Escape}');
    expect(toggle).toHaveFocus();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    /* { closeOnSelect: false } */
    rerender(<Dropdown closeOnSelect={false} />);
    // Open and unselect the option
    await user.keyboard('{Enter}c{ArrowUp}{Enter}');
    expect(screen.getByRole('combobox')).toHaveFocus();
    expect(screen.getByRole('combobox')).toHaveValue('c');
    expect(screen.getByTestId('value')).toHaveTextContent(/^c$/);
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
  });
});
