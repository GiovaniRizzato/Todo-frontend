import { fireEvent, render, screen } from '@testing-library/angular'
import { TextListModule } from '../text-list.module';
import { TextItemComponent } from './text-item.component';

describe('TextItemComponent', () => {
  describe('When the page loads', () => {

    const label = 'Test Label';
    const toggleChangeSpy = jest.fn ();
    const labelChangedSpy = jest.fn ();

    beforeEach(async () => {
      await render (TextItemComponent, {
        declarations: [
          
        ],
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

    it('Should have the label', async () => {
      expect (screen.getByText(label)).toBeInTheDocument ();
    });

    it('Should have the label', async () => {
      expect (screen.getByRole('checkbox')).toBeInTheDocument ();
    });

    it('Should notify when check status change', async () => {
      fireEvent.click(screen.getByRole ('checkbox'))
      
      expect (toggleChangeSpy).toBeCalled ();
    });
  });
});
