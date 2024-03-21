import { fireEvent, render, screen, within } from '@testing-library/angular'
import { CheckboxData, TextListComponent } from './text-list.component';
import { TextListModule } from './text-list.module';

describe('TextListComponent', () => {
  describe('When the page loads', () => {
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
      await render (TextListComponent, {
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
        expect (screen.getByRole ('checkbox', {
          name: textItemData.label,
          checked: textItemData.isChecked ? textItemData.isChecked : false
        })).toBeInTheDocument ();
      });
    });

    it('should have remove checkbox button', () => {
      textList.forEach (textItemData => {
        const removalButtonlabel = textItemData.label + ' removal'
        expect (screen.getByRole ('button', { name: removalButtonlabel })).toBeInTheDocument ();
      });
    });
    
    it('should be able to remove checkbox by clicking on the remove button', () => {
      const deletableCheckbox = screen.getByRole ('checkbox', {
        name: 'Deletable'
      });
      fireEvent.click (screen.getByRole ('button', { name: 'Deletable removal' }));
      expect (deletableCheckbox).not.toBeInTheDocument ();
    }); 
  });
});
