import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { scrollIntoView } from './scrollIntoView';
import { TOTAL_DATA_COUNT } from './data';
import { Autocomplete } from './Autocomplete';

describe('autocomplete', () => {
  test('select mode', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Autocomplete select />);
    const combobox = screen.getByRole('combobox');

    // initial state
    expect(combobox).toHaveAttribute('type', 'text');
    expect(combobox).toHaveAttribute('autocomplete', 'off');
    expect(combobox).toHaveAttribute('aria-autocomplete', 'list');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).toHaveValue('');
    const label = screen.getByText('State');
    expect(label).toHaveAttribute('for', combobox.id);

    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();

    // open combobox by clicking
    await user.click(combobox);
    const listbox = screen.getByRole('listbox');
    expect(combobox).toHaveFocus();
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(combobox).toHaveAttribute('aria-controls', listbox.id);
    expect(listbox).toHaveAttribute('aria-labelledby', label.id);
    expect(screen.getAllByRole('option')).toHaveLength(TOTAL_DATA_COUNT);
    expect(screen.queryByRole('button', { name: 'Clear' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();

    // type a character and show filtered result
    await user.keyboard('c');
    expect(combobox).toHaveValue('c');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
    expect(screen.getByTestId('value')).toHaveTextContent(/^c$/);
    expect(screen.getAllByRole('option')).toHaveLength(3);

    // clicking an element other than options in the listbox
    await user.click(screen.getByTestId('header'));
    expect(combobox).toHaveFocus();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();

    // select an option by clicking
    await user.click(screen.getByRole('option', { name: 'California' }));
    expect(combobox).toHaveFocus();
    expect(combobox).toHaveValue('California');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toHaveTextContent(/^California$/);
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'California', hidden: true })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('option', { name: 'Colorado', hidden: true })).toHaveAttribute(
      'aria-selected',
      'false'
    );

    // close by ESC
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).toBeNull();
    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(combobox).toHaveValue('California');
    expect(screen.getByTestId('selected')).toHaveTextContent(/^California$/);

    // clear by ESC
    await user.keyboard('{Escape}');
    expect(combobox).toHaveValue('');
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    expect(combobox).toHaveFocus();

    // type a character and select with keyboard
    await user.keyboard('c');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Enter}'); // should do nothing
    scrollIntoView.mockClear();
    await user.keyboard('{ArrowDown}');
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('option', { name: 'California' })).toHaveStyle({
      backgroundColor: 'red'
    });
    expect(combobox.getAttribute('aria-activedescendant')).toBe(
      screen.getByRole('option', { name: 'California' }).id
    );
    await user.keyboard('{ArrowUp>2/}{ArrowDown>3/}');
    expect(scrollIntoView).toHaveBeenCalledTimes(6);
    expect(screen.getByRole('option', { name: 'Colorado' })).toHaveStyle({
      backgroundColor: 'red'
    });
    expect(combobox.getAttribute('aria-activedescendant')).toBe(
      screen.getByRole('option', { name: 'Colorado' }).id
    );
    expect(combobox).toHaveValue('c');
    expect(screen.getByTestId('value')).toHaveTextContent(/^c$/);
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    await user.keyboard('{Enter}');
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(combobox).toHaveValue('Colorado');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Colorado$/);
    expect(screen.getByRole('option', { name: 'Colorado', hidden: true })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    await user.keyboard('{Enter}'); // should do nothing

    // Test toggle button
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(TOTAL_DATA_COUNT);
    expect(screen.getByRole('option', { name: 'Colorado' })).toHaveStyle({
      textDecoration: 'underline'
    });
    await user.dblClick(screen.getByRole('button', { name: 'Close' }));

    // Delete characters
    await user.keyboard('{Backspace}');
    expect(combobox).toHaveValue('Colorad');
    expect(screen.getByTestId('value')).toHaveTextContent(/^Colorad$/);
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Colorado$/);
    await user.keyboard('{Backspace>10/}');
    expect(combobox).toHaveValue('');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    expect(screen.getByRole('option', { name: 'Colorado' })).toHaveStyle({
      textDecoration: 'none'
    });

    // Test clear button
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('option', { name: 'Alabama' })).toHaveStyle({
      backgroundColor: 'red'
    });
    await user.click(screen.getByRole('option', { name: 'Alaska' }));
    expect(combobox).toHaveValue('Alaska');
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Alaska$/);
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(combobox).toHaveFocus();
    expect(combobox).toHaveValue('');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear' })).toBeNull();
    expect(screen.getAllByRole('option')).toHaveLength(TOTAL_DATA_COUNT);

    // Focus an item and blur input
    await user.keyboard('{ArrowDown>3/}');
    expect(screen.getByRole('option', { name: 'Arizona' })).toHaveStyle({
      backgroundColor: 'red'
    });
    await user.click(screen.getByTestId('value'));
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();

    /* { rovingText: true } */
    // Focus an item and blur input
    rerender(<Autocomplete select rovingText />);
    await user.type(combobox, 'c');
    expect(combobox).toHaveValue('c');
    await user.keyboard('{ArrowDown}');
    expect(combobox).toHaveValue('California');
    await user.keyboard('{ArrowUp}');
    expect(combobox).toHaveValue('c');
    await user.keyboard('{ArrowUp>2/}');
    expect(combobox).toHaveValue('Colorado');
    await user.click(screen.getByTestId('value'));
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Colorado$/);

    /* { deselectOnClear: false } */
    // Deleting all characters will not clear selection
    rerender(<Autocomplete select deselectOnClear={false} />);
    combobox.focus();
    await user.keyboard('{Backspace}');
    expect(combobox).toHaveValue('Colorad');
    expect(screen.getByTestId('value')).toHaveTextContent(/^Colorad$/);
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Colorado$/);
    await user.keyboard('{Backspace>10/}');
    expect(combobox).toHaveValue('');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Colorado$/);
    await user.click(screen.getByTestId('value'));
    expect(combobox).toHaveValue('Colorado');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Colorado$/);

    // Clicking clear button will not clear selection
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(combobox).toHaveValue('');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Colorado$/);
    await user.click(screen.getByTestId('value'));
    expect(combobox).toHaveValue('Colorado');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Colorado$/);

    // Pressing ESC will not clear selection
    combobox.focus();
    await user.keyboard('{Escape}');
    expect(combobox).toHaveValue('');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Colorado$/);
    await user.click(screen.getByTestId('value'));
    expect(combobox).toHaveValue('Colorado');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Colorado$/);

    /* { closeOnSelect: false } */
    rerender(<Autocomplete select closeOnSelect={false} />);
    await user.click(combobox);
    await user.click(screen.getByRole('option', { name: 'California' }));
    expect(combobox).toHaveValue('California');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toHaveTextContent(/^California$/);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{ArrowDown}{Enter}');
    expect(combobox).toHaveValue('Alabama');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Alabama$/);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    /* { closeOnSelect: false, flipOnSelect: true } */
    rerender(<Autocomplete select closeOnSelect={false} flipOnSelect />);
    await user.keyboard('{ArrowDown}{Enter}');
    expect(combobox).toHaveValue('');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    await user.click(screen.getByRole('option', { name: 'Alabama' }));
    expect(combobox).toHaveValue('Alabama');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Alabama$/);
    await user.click(screen.getByRole('option', { name: 'Alabama' }));
    expect(combobox).toHaveValue('');
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
  });

  test('search mode', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Autocomplete deselectOnChange={false} />);
    const combobox = screen.getByRole('combobox');

    // select an option with keyboard
    await user.type(combobox, 'c');
    await user.keyboard('{ArrowUp>2/}');
    expect(screen.getByRole('option', { name: 'California' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
    expect(screen.getByRole('option', { name: 'Colorado' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(combobox).toHaveValue('c');
    expect(screen.getByTestId('value')).toHaveTextContent(/^c$/);
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    await user.keyboard('{Enter}');
    expect(combobox).toHaveValue('Colorado');
    expect(screen.getByTestId('value')).toHaveTextContent(/^Colorado$/);
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Colorado$/);
    expect(screen.getByRole('option', { name: 'Colorado', hidden: true })).toHaveAttribute(
      'aria-selected',
      'false'
    );

    // Deleting a character should not clear selection
    await user.keyboard('{Backspace}');
    expect(combobox).toHaveValue('Colorad');
    expect(screen.getByTestId('value')).toHaveTextContent(/^Colorad$/);
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Colorado$/);

    /* { deselectOnChange: true } */
    // Deleting a character should clear selection
    rerender(<Autocomplete />);
    await user.keyboard('{Backspace}');
    expect(combobox).toHaveValue('Colora');
    expect(screen.getByTestId('value')).toHaveTextContent(/^Colora$/);
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();

    // Pressing enter should submit value
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Enter}');
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(combobox).toHaveValue('Colora');
    expect(screen.getByTestId('value')).toHaveTextContent(/^Colora$/);
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
  });

  test('disabled items', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Autocomplete isItemDisabled={(item) => item.name === 'California'} />
    );
    const combobox = screen.getByRole('combobox');

    await user.type(combobox, 'c');
    expect(screen.getByRole('option', { name: 'California' })).toHaveStyle({
      color: 'gray',
      backgroundColor: 'transparent'
    });
    await user.click(screen.getByRole('option', { name: 'California' }));
    expect(combobox).toHaveFocus();
    expect(combobox).toHaveValue('c');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('option', { name: 'Colorado' })).toHaveStyle({
      backgroundColor: 'red'
    });
    await user.keyboard('{ArrowUp>3/}');
    expect(screen.getByRole('option', { name: 'Connecticut' })).toHaveStyle({
      backgroundColor: 'red'
    });
    await user.keyboard('{Escape}');

    rerender(<Autocomplete isItemDisabled={(item) => item.name !== 'California'} />);
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('option', { name: 'California' })).toHaveStyle({
      color: 'white',
      backgroundColor: 'transparent'
    });
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('option', { name: 'California' })).toHaveStyle({
      backgroundColor: 'red'
    });
    await user.keyboard('{ArrowDown>3/}');
    expect(screen.getByRole('option', { name: 'California' })).toHaveStyle({
      backgroundColor: 'red'
    });
    await user.keyboard('{Escape}');

    rerender(<Autocomplete isItemDisabled={() => true} />);
    await user.keyboard('{ArrowDown>3/}{ArrowUp>2/}{Escape}');

    rerender(<Autocomplete isItemDisabled={() => true} rovingText />);
    await user.keyboard('{ArrowDown>3/}{ArrowUp>2/}{Escape}');
  });

  test('action items', async () => {
    const user = userEvent.setup();
    const onAction = jest.fn();
    const { rerender } = render(
      <Autocomplete isItemAction={(item) => item.name === 'California'} onAction={onAction} />
    );
    const combobox = screen.getByRole('combobox');
    await user.type(combobox, 'c');
    await user.keyboard('{ArrowDown}{Enter}');
    expect(onAction).toHaveBeenCalledWith({ abbr: 'CA', name: 'California' });
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();

    rerender(
      <Autocomplete
        isItemAction={(item) => item.name === 'California'}
        onAction={onAction}
        closeOnSelect={false}
      />
    );
    onAction.mockClear();
    await user.keyboard('{ArrowDown>2}{Enter}');
    expect(onAction).toHaveBeenCalledWith({ abbr: 'CA', name: 'California' });
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
  });
});
