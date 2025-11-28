import React from 'react';
import DocItemLayout from '@theme-original/DocItem/Layout';
import TranslationControl from '../TranslationControl';
import Personalizer from '../Personalizer';
import type {Props} from '@theme/DocItem/Layout';

export default function DocItemLayoutWrapper(props: Props): JSX.Element {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', margin: '1rem' }}>
        <TranslationControl />
        <Personalizer />
      </div>
      <DocItemLayout {...props} />
    </>
  );
}
