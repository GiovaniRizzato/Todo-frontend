import { render, screen } from '@testing-library/angular'
import { TextListComponent } from './text-list.component';

describe('AppComponent', () => {
  describe('When the page loads', () => {
    it('Should render the message', async () => {
      await render (TextListComponent)
      expect (screen.getByText('Todo-frontend app is running!')).toBeInTheDocument ();
    });
  });
});
