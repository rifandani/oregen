export default `import TemplateName from './TemplateName';

const Story = {
  component: TemplateName,
  title: "TemplateName",
};
export default Story;

const Template = (args) => <TemplateName {...args} />;

export const Default = Template.bind({});

Default.args = {};
`;
