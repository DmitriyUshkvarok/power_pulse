import { render, screen } from '@testing-library/react';
import Container from '../Container';

describe('Container component', () => {
  it('renders without crashing', () => {
    render(<Container>Test Content</Container>);
    const containerElement = screen.getByText('Test Content');
    expect(containerElement).toBeInTheDocument();
  });

  it('applies the correct CSS class', () => {
    render(<Container>Test Content</Container>);
    const containerElement = screen.getByText('Test Content');
    expect(containerElement).toHaveClass('container');
  });

  it('renders children correctly', () => {
    render(
      <Container>
        <span>Child 1</span>
        <span>Child 2</span>
      </Container>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
