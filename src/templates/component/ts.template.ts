export default `import React from 'react';
import tw from 'twin.macro';
import styles from './TemplateName.module.css';

export type TemplateNameProps {
  value: any;
}

const Container = tw.div\`h-full w-full\`;

function TemplateName({ value }: TemplateNameProps) {
  return (
    <Container className={styles.TemplateName} data-testid="TemplateName">
      TemplateName Component
    </Container>
  );
};

export default TemplateName;
`;
