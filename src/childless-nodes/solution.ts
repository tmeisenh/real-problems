import { CNNode, Container, Leaf } from './types';

const isLeaf = (x: CNNode): boolean => {
  return (
    (x as Container).children === undefined || (x as Leaf).data !== undefined
  );
};

const isContainer = (x: CNNode): boolean => !isLeaf(x);

const countOfChildrenWithData = (
  x: CNNode,
  accumulator: number = 0
): number => {
  if (isLeaf(x)) {
    return accumulator + 1;
  }

  if (isContainer(x) && (x as Container).children === []) {
    return accumulator;
  }

  return (x as Container).children.reduce<number>((acc, cur) => {
    return countOfChildrenWithData(cur, acc);
  }, accumulator);
};

const hasChildrenWithData = (x: CNNode) => countOfChildrenWithData(x) > 0;

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
