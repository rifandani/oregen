export default `import React from 'react';
import tw from 'twin.macro';
import PropTypes from 'prop-types';
import styles from './TemplateName.module.css';

const Container = tw.div\`h-full w-full\`;

function TemplateName() {
  return (
    <Container className={styles.TemplateName} data-testid="TemplateName">
      TemplateName Component
    </Container>
  );
};

TemplateName.propTypes = {};

TemplateName.defaultProps = {};

export default TemplateName;
`;
