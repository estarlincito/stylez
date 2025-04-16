export interface StyleEntry {
  [x: string]: object;
  ':root': Record<string, string>;
}

interface Value {
  value: string;
  type: 'StringLiteral' | 'NumericLiteral' | 'ObjectExpression';
}

export interface Properties {
  type: 'KeyValueProperty';
  value: Value & {
    properties?: {
      type: 'KeyValueProperty';
      key: { value: string; type: 'Identifier' | 'StringLiteral' };
      value: Value;
    }[];
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
