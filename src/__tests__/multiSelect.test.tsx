import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './utils/scrollIntoView';
import { MultiSelect } from './utils/MultiSelect';

describe('multiSelect', () => {
  test('continuous interactions', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<MultiSelect />);
    const combobox = screen.getByRole('combobox');
    const inputWrapper = screen.getByTestId('input-wrapper');
    expect(inputWrapper).toHaveStyle({ borderColor: 'white' });

    // [scenario] Select multiple items with mouse and keyboard
    await user.click(combobox);
    await user.click(screen.getByRole('option', { name: 'Alaska' }));
    await user.keyboard('{ArrowDown>2/}{Enter}');
    await user.keyboard('{ArrowDown>2/}{Enter}'); // select the same item again will not flip select
    await user.keyboard('c{ArrowUp>2/}{Enter}');
    expect(combobox).toHaveValue('');
    let selected = screen.getAllByTestId('selected');
    expect(selected).toHaveLength(3);
    expect(selected[0]).toHaveTextContent(/^Alaska$/);
    expect(selected[1]).toHaveTextContent(/^Alabama$/);
    expect(selected[2]).toHaveTextContent(/^Colorado$/);
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(inputWrapper).toHaveStyle({ borderColor: 'blue' });

    // [scenario] Remove one item by clicking it
    await user.click(screen.getByRole('button', { name: 'Alabama' }));
    selected = screen.getAllByTestId('selected');
    expect(selected).toHaveLength(2);
    expect(selected[0]).toHaveTextContent(/^Alaska$/);
    expect(selected[1]).toHaveTextContent(/^Colorado$/);

    // [scenario] Remove items by Backspace
    await user.keyboard('c{Backspace>2/}');
    selected = screen.getAllByTestId('selected');
    expect(selected).toHaveLength(1);
    expect(selected[0]).toHaveTextContent(/^Alaska$/);
    await user.keyboard('{Backspace}');
    selected = screen.queryAllByTestId('selected');
    expect(selected).toHaveLength(0);
    await user.keyboard('{Backspace>2/}');
    selected = screen.queryAllByTestId('selected');
    expect(selected).toHaveLength(0);

    // [scenario] Clicking a selected item will focus input
    await user.keyboard('{ArrowDown}{Enter}{ArrowDown>3/}{Enter}{ArrowDown>4/}{Enter}');
    await user.click(screen.getByTestId('value'));
    expect(combobox).not.toHaveFocus();
    expect(inputWrapper).toHaveStyle({ borderColor: 'white' });
    expect(screen.getAllByTestId('selected')).toHaveLength(3);
    await user.click(screen.getByRole('button', { name: 'Alabama' }));
    expect(combobox).toHaveFocus();
    expect(inputWrapper).toHaveStyle({ borderColor: 'blue' });
    expect(screen.getAllByTestId('selected')).toHaveLength(2);

    // [scenario] Clicking a selected item will keep list open and input focused
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Arizona' }));
    expect(combobox).toHaveFocus();
    expect(inputWrapper).toHaveStyle({ borderColor: 'blue' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByTestId('selected')).toHaveLength(1);

    // [scenario] Open and close with toggle
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('listbox')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    /* [scenario] { closeOnSelect: false, flipOnSelect: true } */
    rerender(<MultiSelect closeOnSelect={false} flipOnSelect />);
    await user.keyboard('c{ArrowUp}{Enter}');
    selected = screen.getAllByTestId('selected');
    expect(selected).toHaveLength(2);
    expect(selected[0]).toHaveTextContent(/^Alaska$/);
    expect(selected[1]).toHaveTextContent(/^Connecticut$/);
    await user.keyboard('{ArrowUp}{Enter}');
    selected = screen.getAllByTestId('selected');
    expect(selected).toHaveLength(1);
    expect(selected[0]).toHaveTextContent(/^Alaska$/);
    expect(screen.getByTestId('value')).toHaveTextContent(/^c$/);
  });

  test('navigating and deleting tags', async () => {
    const user = userEvent.setup();
    render(<MultiSelect />);
    const combobox = screen.getByRole('combobox');
    await user.click(combobox);
    await user.keyboard('a{ArrowDown}{Enter}');
    await user.keyboard('a{ArrowDown>3/}{Enter}');
    await user.keyboard('c{ArrowDown>2/}{Enter}');
    // Selected "Alabama", "Arizona", "Colorado"
    let selected = screen.queryAllByTestId('selected');
    expect(selected).toHaveLength(3);
    await user.keyboard('{ArrowDown>2/}');
    expect(screen.getByRole('option', { name: 'Alabama' })).toHaveStyle({
      backgroundColor: 'red'
    });
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('option', { name: 'Alabama' })).toHaveStyle({
      backgroundColor: 'transparent'
    });
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'green'
    });
    expect(combobox).toHaveStyle({ caretColor: 'transparent' });
    await user.keyboard('{ArrowLeft>2/}');
    expect(screen.getByRole('button', { name: 'Alabama' })).toHaveStyle({
      color: 'green'
    });
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'gray'
    });
    await user.keyboard('{ArrowLeft>2/}');
    expect(screen.getByRole('button', { name: 'Alabama' })).toHaveStyle({
      color: 'green'
    });
    await user.keyboard('{ArrowRight>2/}');
    expect(screen.getByRole('button', { name: 'Alabama' })).toHaveStyle({
      color: 'gray'
    });
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'green'
    });
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'gray'
    });
    expect(combobox).toHaveStyle({ caretColor: 'auto' });

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('option', { name: 'Alabama' })).toHaveStyle({
      backgroundColor: 'red'
    });
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('option', { name: 'Alabama' })).toHaveStyle({
      backgroundColor: 'red'
    });
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('option', { name: 'Alabama' })).toHaveStyle({
      backgroundColor: 'transparent'
    });
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'green'
    });
    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'gray'
    });
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'green'
    });
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'gray'
    });
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'green'
    });
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'gray'
    });
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'green'
    });
    await user.type(combobox, 'c');
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'gray'
    });
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'gray'
    });
    await user.keyboard('{ArrowRight}{Backspace}{ArrowLeft}');
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'green'
    });
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.getByRole('button', { name: 'Colorado' })).toHaveStyle({
      color: 'gray'
    });
    await user.keyboard('{ArrowLeft>2/}');
    expect(screen.getByRole('button', { name: 'Arizona' })).toHaveStyle({
      color: 'green'
    });
    selected = screen.queryAllByTestId('selected');
    expect(selected).toHaveLength(3);
    await user.keyboard('{Backspace}');
    selected = screen.queryAllByTestId('selected');
    expect(selected).toHaveLength(2);
    expect(selected[0]).toHaveTextContent(/^Alabama$/);
    expect(selected[0]).toHaveStyle({ color: 'gray' });
    expect(selected[1]).toHaveTextContent(/^Colorado$/);
    expect(selected[1]).toHaveStyle({ color: 'gray' });
    expect(combobox).toHaveStyle({ caretColor: 'auto' });
    await user.keyboard('{Backspace}');
    selected = screen.queryAllByTestId('selected');
    expect(selected).toHaveLength(1);
    expect(selected[0]).toHaveTextContent(/^Alabama$/);
    expect(combobox).toHaveStyle({ caretColor: 'auto' });
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('button', { name: 'Alabama' })).toHaveStyle({
      color: 'green'
    });
    expect(combobox).toHaveStyle({ caretColor: 'transparent' });
  });
});
