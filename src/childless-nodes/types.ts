export interface Leaf {
  label: string;
  data: string;
}

export interface Container {
  label: string;
  children: Array<Container | Leaf>;
}

export type CNNode = Container | Leaf;
