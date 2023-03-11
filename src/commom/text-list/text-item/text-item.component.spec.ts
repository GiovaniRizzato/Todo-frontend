import { render, screen } from '@testing-library/angular'
import { TextItemComponent } from './text-item.component';

describe('AppComponent', () => {
  describe('When the page loads', () => {
    it('Should render the message', async () => {
      await render (TextItemComponent)
      expect (screen.getByText('Todo-frontend app is running!')).toBeInTheDocument ();
    });
  });
});
