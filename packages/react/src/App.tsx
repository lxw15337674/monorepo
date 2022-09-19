import React, { useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'In addition to nodes that contain editable text, you can insert void nodes, which can also contain editable elements, inputs, or an entire other Slate editor.',
      },
    ],
  },
  {
    type: 'button',
    children: [{ text: 'this is button' }],
  },
];

const withEditableVoids = (e) => {
  const { apply } = e;
  e.apply = (op) => {
    apply(op);
    console.log(e);
  };
  return e;
};

const Element = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'button':
      return <button>this is button</button>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const PlainTextExample = () => {
  const editor = useMemo(
    () => withEditableVoids(withHistory(withReact(createEditor()))),
    [],
  );
  const [value, setValue] = useState<Descendant[]>([]);
  return (
    <Slate editor={editor} value={initialValue} onChange={setValue}>
      <div style={{ border: 'black 1px solid' }}>
        <Editable
          renderElement={(props) => <Element {...props} />}
          placeholder="Enter some plain text..."
        />
      </div>
    </Slate>
  );
};

export default PlainTextExample;
