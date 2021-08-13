import { solve } from './solution';
import { CNNode } from './types';

describe('childless nodes', () => {
  it('handles empty case', () => {
    const actual = solve([]);
    expect(actual).toEqual([]);
  });

  it('keeps first level nodes with data', () => {
    const data: CNNode[] = [
      {
        label: '1',
        data: 'd',
      },
      {
        label: '2',
        data: 'd',
      },
      {
        label: ' no data',
        children: [],
      },
    ];

    const actual = solve(data);
    expect(actual).toEqual([
      {
        label: '1',
        data: 'd',
      },
      {
        label: '2',
        data: 'd',
      },
    ] as CNNode[]);
  });

  it('recurse and keeps with data', () => {
    const data: CNNode[] = [
      {
        label: 'a',
        data: 'foo',
      },
      {
        label: 'b',
        children: [],
      },
      {
        label: 'c',
        children: [
          {
            label: 'd',
            children: [
              {
                label: 'f',
                children: [],
              },
              {
                label: 'g',
                data: 'hi',
              },
            ],
          },
          {
            label: 'e',
            children: [],
          },
        ],
      },
    ];
    const actual = solve(data);

    expect(actual).toEqual([
      {
        label: 'a',
        data: 'foo',
      },
      {
        label: 'c',
        children: [
          {
            label: 'd',
            children: [
              {
                label: 'g',
                data: 'hi',
              },
            ],
          },
        ],
      },
    ] as CNNode[]);
  });

  it('recurse keeping containers with data or that have descendants with data', () => {
    const data: CNNode[] = [
      { label: 'w', children: [] },
      {
        label: 'a',
        data: 'f',
      },
      {
        label: 'g',
        children: [
          {
            label: 'g',
            children: [
              {
                label: 'h',
                children: [
                  {
                    label: 'i',
                    children: [
                      {
                        label: 'j',
                        children: [
                          {
                            label: 'k',
                            data: 'foo',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'g',
        children: [
          {
            label: 'g',
            children: [
              {
                label: 'h',
                children: [
                  {
                    label: 'i',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'g',
        children: [
          {
            label: 'g',
            children: [
              { label: 'z', data: 'aa' },
              { label: 'zz', children: [] },
              {
                label: 'h',
                children: [
                  {
                    label: 'i',
                    children: [
                      {
                        label: 'j',
                        children: [
                          {
                            label: 'k',
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    const actual = solve(data);
    expect(actual).toEqual([
      {
        label: 'a',
        data: 'f',
      },
      {
        label: 'g',
        children: [
          {
            label: 'g',
            children: [
              {
                label: 'h',
                children: [
                  {
                    label: 'i',
                    children: [
                      {
                        label: 'j',
                        children: [
                          {
                            label: 'k',
                            data: 'foo',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'g',
        children: [
          {
            label: 'g',
            children: [{ label: 'z', data: 'aa' }],
          },
        ],
      },
    ] as CNNode[]);
  });
});
