import { render, screen } from '@testing-library/angular'
import { checkboxData, TextListComponent } from './text-list.component';
import { TextListModule } from './text-list.module';

describe('TextListComponent', () => {
  describe('When the page loads', () => {
    const textList = [
      {
        id: "1",
        label: "Test label 1",
      } as checkboxData,
      {
        id: "2",
        label: "Test label 2",
        isChecked: true
      } as checkboxData,
      {
        id: "3",
        label: "Deletable",
        isChecked: false
      } as checkboxData
    ]

    beforeEach(async () => {
      await render (TextListComponent, {
        imports: [
          TextListModule
        ],
        componentProperties: {
          textList
        }
      });
    });

    it('should display all checkboxes properly labeled and its status correct', () => {
      textList.forEach (textItemData => {
        console.log({
          name: textItemData.label,
          checked: textItemData.isChecked ? textItemData.isChecked : false
        });
        expect (screen.getByRole ('checkbox', {
          name: textItemData.label,
          checked: textItemData.isChecked ? textItemData.isChecked : false
        })).toBeInTheDocument ();
      });
    });
  });
});
