import { Component, EventEmitter, Input, Output } from '@angular/core';
import { render, RenderResult } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { TextItemModule } from './text-item.module';

@Component({
  selector: 'text-item-test', 
  template: `
    <text-item
      labelId="labelId"
      [isChecked]="true"
      (labelChanged)="testLabelChanged($event)"
      (toggleChange)="toggleChange.emit($event)"
    >
      <span id="labelId">{{label}}</span>
    </text-item>
  `
})
class TextItemTestComponent {
  @Input() label?: string;
  @Input() isChecked? = false;
  @Output() toggleChange = new EventEmitter<any>();
  @Output() labelChanged = new EventEmitter<any>();

  testLabelChanged($event: any) {
    this.label = $event.newLabel;
    this.labelChanged.emit ($event);
  }
}

describe ('TextItemComponent', () => {
  let component: RenderResult<TextItemTestComponent, TextItemTestComponent>;
  const toggleChangeEmiter = {
    emit: jest.fn ()
  };
  const labelChangedEmiter = {
    emit: jest.fn ()
  };

  beforeEach (async () => {
    toggleChangeEmiter.emit = jest.fn (); 
    labelChangedEmiter.emit = jest.fn ();

    component = await render (TextItemTestComponent, {
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
    expect (component.getByRole ('checkbox', {name: 'Test Label'})).toBeInTheDocument ();
    expect (component.getByText ('Test Label')).toBeVisible ();
  });

  it ('Should notify when check status change', async () => {
    await userEvent.click (component.getByRole ('checkbox', {name: 'Test Label'}));
    expect (toggleChangeEmiter.emit).toBeCalledWith (expect.objectContaining ({
      checked: false
    }));
  });

  it ('Should have the edit button avalible', () => {
    expect (component.getByRole ('button', { name: 'Edit label' })).toBeVisible ();
  });

  describe ('When the user clicks on the edit button', () => {
    const newLabel = 'newLabel';

    beforeEach (async () => {        
      await userEvent.click (component.getByRole ('button', { name: 'Edit label' }));
      component.detectChanges ();

      expect (component.getByRole ('textbox', { name: 'New description' })).toBeVisible ();
      expect (component.getByRole ('button', { name: 'Confirm change' })).toBeVisible ();
      expect (component.getByRole ('button', { name: 'Cancel editing' })).toBeVisible ();
    });

    it ('Should be able to edit the todo label', async () => {
      await userEvent.type (component.getByRole ('textbox', { name: 'New description' }), newLabel)
      await userEvent.click (component.getByRole ('button', { name: 'Confirm change' }));
      component.detectChanges ();

      expect (component.getByRole ('checkbox', {name: newLabel})).toBeInTheDocument ();
      expect (component.getByText (newLabel)).toBeVisible ();
      expect (labelChangedEmiter.emit).toBeCalledWith (expect.objectContaining ({
        newLabel: 'newLabel'
      }));
    });

    it ('Should be able to cancel editing and reset to previews state', async () => {
      await userEvent.type (component.getByRole ('textbox', { name: 'New description' }), newLabel)
      await userEvent.click (component.getByRole ('button', { name: 'Cancel editing' }));
      component.detectChanges();

      expect (component.getByRole ('checkbox', {name: 'Test Label'})).toBeInTheDocument ();
      expect (component.getByText ('Test Label')).toBeVisible ();
      expect (labelChangedEmiter.emit).not.toBeCalled ();
    });
  });
});
