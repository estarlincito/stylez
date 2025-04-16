export interface StyleEntry {
  [x: string]: object;
  ':root': Record<string, string>;
}

export interface Properties {
  type: 'KeyValueProperty';
  value: {
    value: string;
    type: 'StringLiteral' | 'NumericLiteral' | 'ObjectExpression';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    properties?: any;
  };

  key: { value: string; type: 'Identifier' | 'StringLiteral' };
}

export interface Node {
  callee: {
    type: 'MemberExpression';
    property: { type: 'Identifier'; value: string };
    object: {
      type: 'Identifier';
      value: string;
    };
  };
  arguments: {
    expression: {
      type: 'ObjectExpression';
      properties: Properties[];
    };
  }[];
  specifiers: {
    type: 'ImportDefaultSpecifier' | 'ImportNamespaceSpecifier';
    local: { value: string };
  }[];
  type: 'ImportDeclaration' | 'CallExpression';
  source: { value: '@stylezjs/stylez' };
}
