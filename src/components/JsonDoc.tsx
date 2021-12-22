import theme                    from 'prism-react-renderer/themes/vsDark';
import {JsonDoc as JsonDocBase} from 'react-json-doc';
import React                    from 'react';

const extraTheme = {
  container: {borderRadius: `var(--ifm-code-border-radius)`},
  inactiveHeader: {},
  activeHeader: {borderRadius: `var(--ifm-code-border-radius)`, background: `#3d437c`},
  annotation: {borderRadius: `var(--ifm-code-border-radius)`, background: `#383944`, color: `#ffffff`},
  anchor: {scrollMarginTop: 60},
  section: {fontFamily: `var(--ifm-font-family-monospace)`},
};

export function JsonDoc({data}: {data: any}) {
  return (
    <JsonDocBase theme={theme as any} extraTheme={extraTheme} skipFirstIndent={true} data={data}/>
  );
}
