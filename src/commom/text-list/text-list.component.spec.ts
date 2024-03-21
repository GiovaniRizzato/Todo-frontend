import { render, RenderResult } from '@testing-library/angular'
import userEvent from '@testing-library/user-event';
import { CheckboxData, TextListComponent } from './text-list.component';
import { TextListModule } from './text-list.module';

describe('TextListComponent', () => {
  let component: RenderResult<TextListComponent, TextListComponent>;
  const textList = [
    {
      id: "1",
      label: "Test label 1",
    } as CheckboxData,
    {
      id: "2",
      label: "Test label 2",
      isChecked: true
    } as CheckboxData,
    {
      id: "3",
      label: "Deletable",
      isChecked: false
    } as CheckboxData
  ]

  beforeEach(async () => {
    component = await render (TextListComponent, {
      autoDetectChanges: true,
      imports: [
        TextListModule,
      ],
      componentProperties: {
        textList
      }
    });
  });

  it('should display all checkboxes properly labeled and its status correct', () => {
    textList.forEach (textItemData => {
      expect (component.getByRole ('checkbox', {
        name: textItemData.label,
        checked: textItemData.isChecked ? textItemData.isChecked : false
      })).toBeInTheDocument ();
    });
  });

  it('should have all remove checkbox buttons', () => {
    textList.forEach (textItemData => {
      const removalButtonlabel = textItemData.label + ' removal'
      expect (component.getByRole ('button', { name: removalButtonlabel })).toBeVisible ();
    });
  });

  describe('should be able to remove checkbox', () => {
    beforeEach(() => {
      component.getByRole ('button', { name: 'Test label 1 removal' })
    })

    it('should be able to remove checkbox by clicking on the remove button', async () => {
      const deletableCheckbox = component.getByRole ('checkbox', {
        name: 'Deletable'
      });
      await userEvent.click (component.getByRole ('button', { name: 'Deletable removal' }));
      component.detectChanges ();

      expect (deletableCheckbox).not.toBeInTheDocument ();
    }); 
  });
});
