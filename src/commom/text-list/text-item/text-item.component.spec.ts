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

    it('Should have the edit button avalible', () => {
      expect (screen.getByRole ('button', { name: 'Edit' })).toBeInTheDocument ();
    });

    describe('When the user clicks on the edit button', () => {
      const newLabel = 'newLabel';

      beforeEach(() => {
        fireEvent.click (screen.getByRole ('button', { name: 'Edit' }));
      });

      it('Should be able to edit the todo label', () => {
        const inputField = screen.getByPlaceholderText ('New "todo" description');
        fireEvent.input (inputField, {target: {value: newLabel}})
        fireEvent.click (screen.getByRole ('button', { name: 'Confirm change' }));
        
        expect (screen.getByRole ('checkbox', {name: newLabel})).toBeInTheDocument ();
        expect (labelChangedSpy).toBeCalledWith (newLabel);
      });

      it('Should be able to cancel editing and reset to previews state', () => {
        const inputField = screen.getByPlaceholderText ('New "todo" description');
        fireEvent.input (inputField, {target: {value: newLabel}})
        fireEvent.click (screen.getByRole ('button', { name: 'Cancel editing' }));
        
        expect (screen.getByRole ('checkbox', {name: label})).toBeInTheDocument ();
        expect (labelChangedSpy).not.toBeCalled ();
      });
    });
  });
});
