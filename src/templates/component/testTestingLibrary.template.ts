export default `import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import TemplateName from './TemplateName';

describe('<TemplateName />', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<TemplateName />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be in the document', () => {
    render(<TemplateName />);

    const templateName = screen.getByTestId('TemplateName');

    expect(templateName).toBeInTheDocument();
  });
});
`;
