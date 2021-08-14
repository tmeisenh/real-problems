# childless-nodes

This was a problem I had to solve while working on a node api.

The problem: we had a data structure that described how a UI View was to be represented. Some of the components in this data structure contained meta data that told the api to fetch some reference/auxillary data. There was a very real case where a component required reference data but we were unable to fetch it.

Where it got a little difficult was a component could contain children components (which could contain children, and those could contain children, and so on...). The Business Rules were the only components that get returned are components that themselves contain resolved reference data OR a component that contains a component (that contains a component, ad nauseam) which contains resolved reference data.

So we needed the ability to basically walk through this component data structure and mutate it so that the only components that remained passed the Business Rules.

For the sake of simplicity, this problem deals with a "Node" that is either a "Container" or a "Leaf" (see the types). A Leaf contains data but no children; a Container contains children but no data.
