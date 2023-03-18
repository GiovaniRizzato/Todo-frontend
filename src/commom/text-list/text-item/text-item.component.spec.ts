import { fireEvent, render, screen } from '@testing-library/angular'
import { TextListModule } from '../text-list.module';
import { TextItemComponent } from './text-item.component';

describe ('TextItemComponent', () => {
  describe ('When the page loads', () => {

    const label = 'Test Label';
    const toggleChangeSpy = jest.fn ();
    const labelChangedSpy = jest.fn ();

    beforeEach(async () => {
      await render (TextItemComponent, {
        imports: [
          TextListModule
        ],
        componentProperties: {
          label,
          toggleChange: {
            emit: toggleChangeSpy
          } as any,
          labelChanged: {
            emit: labelChangedSpy
          } as any
        }
      });
    });

    it('Should the checkbox with propper label ateched to it', () => {
      expect (screen.getByRole('checkbox', {name: label})).toBeInTheDocument ();
    });

    it('Should notify when check status change', () => {
      fireEvent.click(screen.getByRole ('checkbox'));
      expect (toggleChangeSpy).toBeCalled ();
    });

    //TODO - juntar ambos testes abaixo para formar um "when editing the text-item"
    it('Should be able to edit the todo label', () => {
      const newLabel = 'newLabel';

      fireEvent.click (screen.getByRole ('button', { description: 'Edit' }));
      const inputField = screen.getByPlaceholderText ('New "todo" description');
      fireEvent.change (inputField, {target: {value: newLabel}})
      fireEvent.click (screen.getByRole ('button', { description: 'Confirm change' }));
      
      expect (screen.getByText (newLabel)).toBeInTheDocument ();
      expect (labelChangedSpy).toBeCalledWith (newLabel);
    });

    it('Should be able to cancel editing and reset to previews state', () => {
      fireEvent.click (screen.getByRole ('button', { description: 'Edit' }));
      const inputField = screen.getByPlaceholderText ('New "todo" description');
      fireEvent.change (inputField, {target: {value: 'newLabel'}})
      fireEvent.click (screen.getByRole ('button', { description: 'Cancel editing' }));
      
      expect (screen.getByRole ('checkbox', {name: label})).toBeInTheDocument ();
      expect (labelChangedSpy).not.toBeCalled ();
    });
  });
});
