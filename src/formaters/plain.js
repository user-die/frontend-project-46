import { buildDiff } from '../buildDiff.js';

const checkType = (data) => {
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  if (typeof data === 'object' && data !== null) {
    return '[complex value]';
  }
  return data;
};

export default (f1, f2) => {
  const innerTree = buildDiff(f1, f2);
  const iter = (tree, path) => {
    const filtered = tree.filter((node) => node.status !== 'unchanged');
    return filtered.map((node) => {
      const fullPath = (path === '') ? `${node.key}` : `${path}.${node.key}`;
      switch (node.status) {
        case 'deleted':
          return `Property '${fullPath}' was removed`;
        case 'added':
          return `Property '${fullPath}' was added with value: ${checkType(node.value)}`;
        case 'changed':
          return `Property '${fullPath}' was updated. From ${checkType(node.value)} to ${checkType(node.value2)}`;
        case 'nested':
          return iter(node.children, fullPath);
        default:
          throw new Error();
      }
    }).join('\n');
  };
  return iter(innerTree, '');
};