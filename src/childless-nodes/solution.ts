import { CNNode, Container, Leaf } from './types';

const isLeaf = (x: CNNode): boolean => {
  return (
    (x as Container).children === undefined || (x as Leaf).data !== undefined
  );
};

const isContainer = (x: CNNode): boolean => !isLeaf(x);

const hasChildrenWithData = (
  x: CNNode,
  accumulator: boolean = false
): boolean => {
  if (isLeaf(x)) {
    return true;
  }

  if (isContainer(x) && (x as Container).children === []) {
    return false;
  }

  return (x as Container).children.reduce<boolean>((acc, cur, _idx, arr) => {
    if (true === acc) {
      arr.slice(1); // to break out of a reduce early, mutate the underlying array it's using...
      return acc;
    }
    return hasChildrenWithData(cur, acc);
  }, accumulator);
};

const removeNodesWithoutData = (
  data: CNNode[],
  accumulator: CNNode[] = []
): CNNode[] => {
  return data.reduce((acc, cur) => {
    if (isLeaf(cur)) {
      acc.push(cur);
      return acc;
    }
    if (hasChildrenWithData(cur)) {
      const x: Container = {
        ...cur,
        children: removeNodesWithoutData((cur as Container).children, []),
      };
      acc.push(x);
      return acc;
    }
    return acc;
  }, accumulator);
};

export const solve = (nodes: CNNode[]): CNNode[] =>
  removeNodesWithoutData(nodes);
