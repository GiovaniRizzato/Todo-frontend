import { render, RenderResult } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { TextItemComponent } from './text-item.component';
import { TextItemModule } from './text-item.module';

describe ('TextItemComponent', () => {
  let component: RenderResult<TextItemComponent, TextItemComponent>;
  const toggleChangeEmiter = {
    emit: jest.fn ()
  };
  const labelChangedEmiter = {
    emit: jest.fn ()
  };

  beforeEach (async () => {
    toggleChangeEmiter.emit = jest.fn ();
    labelChangedEmiter.emit = jest.fn ();

    component = await render (TextItemComponent, {
      imports: [
        TextItemModule
      ],
      componentProperties: {
        label: 'Test Label',
        isChecked: true,
        toggleChange: toggleChangeEmiter as any,
        labelChanged: labelChangedEmiter as any
      }
    });
  });

  it ('Should the checkbox with propper label ateched to it', () => {
    expect (component.getByRole ('checkbox', {
      name: 'Test Label',
      checked: true
    })).toBeInTheDocument ();
  });

  it ('Should notify when check status change', async () => {
    await userEvent.click (component.getByRole ('checkbox'));
    expect (toggleChangeEmiter.emit).toBeCalledWith (expect.objectContaining ({
      checked: false
    }));
  });

  it ('Should have the edit button avalible', () => {
    expect (component.getByRole ('button', { name: `Edit label for Test Label` })).toBeVisible ();
  });

  describe ('When the user clicks on the edit button', () => {
    const newLabel = 'newLabel';

    beforeEach (async () => {        
      await userEvent.click (component.getByRole ('button', { name: `Edit label for Test Label` }));
      component.detectChanges ();

      expect (component.getByRole ('textbox', { name: 'New description' })).toBeInTheDocument ();
      expect (component.getByRole ('button', { name: 'Confirm change' })).toBeInTheDocument ();
      expect (component.getByRole ('button', { name: 'Cancel editing' })).toBeInTheDocument ();
    });

    it ('Should be able to edit the todo label', async () => {
      await userEvent.type (component.getByRole ('textbox', { name: 'New description' }), newLabel)
      await userEvent.click (component.getByRole ('button', { name: 'Confirm change' }));
      component.detectChanges ();

      expect (component.getByRole ('checkbox', {name: newLabel})).toBeInTheDocument ();
      expect (labelChangedEmiter.emit).toBeCalledWith (expect.objectContaining ({
        newLabel: 'newLabel'
      }));
    });

    it ('Should be able to cancel editing and reset to previews state', async () => {
      await userEvent.type (component.getByRole ('textbox', { name: 'New description' }), newLabel)
      await userEvent.click (component.getByRole ('button', { name: 'Cancel editing' }));
      component.detectChanges();

      expect (component.getByRole ('checkbox', {name: 'Test Label'})).toBeInTheDocument ();
      expect (labelChangedEmiter.emit).not.toBeCalled ();
    });
  });
});
