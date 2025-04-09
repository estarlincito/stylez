import { num } from '@estarlincito/utils';
import { toClassName, toCssPro, toVarKey } from '@repo/lib';

import type { Node } from '../types/index.js';

let stylezAlias = 'stylez';

interface Visit {
  node: Node;
  styles: Map<string, Record<string, string>>;
  vars: Map<string, string>;
}

// Recursive visitor to traverse the SWC AST.
export const visit = ({ node, styles, vars }: Visit) => {
  const props: Record<string, string> = {};
  if (!node || typeof node !== 'object') return;

  // Detect import of '@stylezjs/stylez' to capture the alias.
  if (
    node.type === 'ImportDeclaration' &&
    node.source.value === '@stylezjs/stylez'
  ) {
    if (Array.isArray(node.specifiers)) {
      for (const spec of node.specifiers) {
        if (
          spec.type === 'ImportDefaultSpecifier' ||
          spec.type === 'ImportNamespaceSpecifier'
        ) {
          stylezAlias = spec.local.value;
        }
      }
    }
  }

  // Detect calls to stylezAlias.create(...)
  if (node.type === 'CallExpression') {
    const isCreate =
      node.callee &&
      node.callee.type === 'MemberExpression' &&
      node.callee.object &&
      node.callee.object.type === 'Identifier' &&
      node.callee.object.value === stylezAlias &&
      node.callee.property &&
      node.callee.property.type === 'Identifier' &&
      node.callee.property.value === 'create';

    if (isCreate) {
      const styleArg = node.arguments?.[num('0')];

      // Process the arguments to stylez.create({...})
      const isObj = styleArg && styleArg.expression.type === 'ObjectExpression';

      if (isObj) {
        for (const prop of styleArg.expression.properties) {
          const isProp =
            (prop.type === 'KeyValueProperty' &&
              prop.key &&
              prop.key.type === 'Identifier' &&
              prop.value &&
              prop.value.type === 'StringLiteral') ||
            prop.value.type === 'NumericLiteral';

          if (isProp) {
            // generating :root var
            const varKey = toVarKey(prop.value.value);
            if (!vars.get(varKey)) vars.set(varKey, prop.value.value);

            // generating className & props
            const propKey = toCssPro(prop.key.value);

            props[propKey] ??= `var(${varKey})`;
          }
        }
      }

      // Adding className & props
      const className = toClassName(props);
      if (!styles.has(className)) styles.set(className, props);
    }
  }

  for (const key in node) {
    if (Object.prototype.hasOwnProperty.call(node, key)) {
      const child = node[key as never] as [];
      if (Array.isArray(child)) {
        child.forEach((childNode) => visit({ node: childNode, styles, vars }));
      } else if (child && typeof child === 'object') {
        visit({ node: child, styles, vars });
      }
    }
  }
};
