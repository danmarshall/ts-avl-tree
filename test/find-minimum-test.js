import test from 'ava';
import { AvlTree } from '../';

test('should return the minimum key in the tree', function (t) {
  var tree = new AvlTree();
  tree.insert(5, null);
  tree.insert(3, null);
  tree.insert(1, null);
  tree.insert(4, null);
  tree.insert(2, null);
  t.is(tree.findMinimum(), 1);
});
