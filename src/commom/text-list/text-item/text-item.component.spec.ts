import { fireEvent, render, screen } from '@testing-library/angular'
import { TextListModule } from '../text-list.module';
import { TextItemComponent } from './text-item.component';

describe ('TextItemComponent', () => {
  describe ('When the page loads', () => {
    const label = 'Test Label';
    const toggleChangeEmiter = {
      emit: jest.fn ()
    };
    const labelChangedEmiter = {
      emit: jest.fn ()
    };

    beforeEach(async () => {
      toggleChangeEmiter.emit = jest.fn ();
      labelChangedEmiter.emit = jest.fn ();

      await render (TextItemComponent, {
        imports: [
          TextListModule
        ],
        componentProperties: {
          label,
          toggleChange: toggleChangeEmiter as any,
          labelChanged: labelChangedEmiter as any
        }
      });
    });

    it('Should the checkbox with propper label ateched to it', () => {
      expect (screen.getByRole('checkbox', {name: label})).toBeInTheDocument ();
    });

    it('Should notify when check status change', () => {
      fireEvent.click(screen.getByRole ('checkbox'));
      expect (toggleChangeEmiter.emit).toBeCalled ();
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
        expect (labelChangedEmiter.emit).toBeCalledWith (newLabel);
      });

      it('Should be able to cancel editing and reset to previews state', () => {
        const inputField = screen.getByPlaceholderText ('New "todo" description');
        fireEvent.input (inputField, {target: {value: newLabel}})
        fireEvent.click (screen.getByRole ('button', { name: 'Cancel editing' }));
        
        expect (screen.getByRole ('checkbox', {name: label})).toBeInTheDocument ();
        expect (labelChangedEmiter.emit).not.toBeCalled ();
      });
    });
  });
});
