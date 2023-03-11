import { render, screen } from '@testing-library/angular'
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  describe('When the page loads', () => {
    it('Should render the message', async () => {
      await render (AppComponent)
      expect (screen.getByText('Todo-frontend app is running!')).toBeInTheDocument ();
    });
  });
});
