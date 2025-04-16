import { num } from '@estarlincito/utils';
import { toClassName, toCssPro, toVarKey } from '@repo/lib';

import type { Node } from '@/types/index.js';

import { isFlatValue, isNestedValue, isProp } from './is-prop.js';
import { toNestedProp } from './nested-prop.js';

let stylezAlias = 'stylez';

export interface Visit {
  node: Node;
  styles: Map<string, Record<string, string>>;
  vars: Map<string, string>;
}

// Recursive visitor to traverse the SWC AST.
export const visit = ({ node, styles, vars }: Visit) => {
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
        const flatProps: Record<string, string> = {};
        const nestedProps = new Map<string, Record<string, string>>();
        for (const prop of styleArg.expression.properties) {
          if (isProp(prop)) {
            if (isFlatValue(prop)) {
              flatProps[prop.key.value] ??= prop.value.value;
            } else if (isNestedValue(prop)) {
              toNestedProp(prop, nestedProps);
            }
          }
        }

        // Adding className & props
        const className = toClassName({
          ...flatProps,
          ...Object.fromEntries(nestedProps),
        });

        // flat
        const stylesFlat = Object.fromEntries(
          Object.entries(flatProps).map(([key, value]) => {
            const varKey = toVarKey(value);
            if (!vars.get(varKey)) vars.set(varKey, value);
            return [toCssPro(key), `var(${toVarKey(value)})`];
          }),
        );

        if (!styles.has(className)) styles.set(className, stylesFlat);

        // nested
        if (nestedProps.size > num('0')) {
          [...nestedProps.entries()].map(([selector, props]) => {
            const nestedSelector = selector.replace(/&/g, className);
            // Updating key and value

            const stylesNested = Object.fromEntries(
              Object.entries(props).map(([key, value]) => {
                const varKey = toVarKey(value);
                if (!vars.get(varKey)) vars.set(varKey, value);
                return [toCssPro(key), `var(${toVarKey(value)})`];
              }),
            );

            if (!styles.has(nestedSelector))
              styles.set(nestedSelector, stylesNested);
          });
        }
      }
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
