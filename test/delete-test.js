import test from 'ava';
import { AvlTree } from '../';

test('should not change the size of a tree with no root', function (t) {
  var tree = new AvlTree();
  tree.delete(1);
  t.is(tree.size, 0);
});

test('should delete a single key', function (t) {
  var tree = new AvlTree();
  tree.insert(1);
  tree.delete(1);
  t.true(tree.isEmpty);
});

/**
 *       _4_                       _2_
 *      /   \                     /   \
 *     2     6  -> delete(6) ->  1     4
 *    / \                             /
 *   1   3                           3
 */
test('should correctly balance the left left case', function (t) {
  var tree = new AvlTree();
  tree.insert(4, 4);
  tree.insert(2, 2);
  tree.insert(6, 6);
  tree.insert(3, 3);
  tree.insert(5, 5);
  tree.insert(1, 1);
  tree.insert(7, 7);
  tree.delete(7);
  tree.delete(5);
  tree.delete(6);
  t.is(tree._root.key, 2);
  t.is(tree._root.value, 2);
  t.is(tree._root.left.key, 1);
  t.is(tree._root.left.value, 1);
  t.is(tree._root.right.key, 4);
  t.is(tree._root.right.value, 4);
  t.is(tree._root.right.left.key, 3);
  t.is(tree._root.right.left.value, 3);
});

/**
 *       _4_                       _6_
 *      /   \                     /   \
 *     2     6  -> delete(2) ->  4     7
 *          / \                   \
 *         5   7                  5
 */
test('should correctly balance the right right case', function (t) {
  var tree = new AvlTree();
  tree.insert(4, 4);
  tree.insert(2, 2);
  tree.insert(6, 6);
  tree.insert(3, 3);
  tree.insert(5, 5);
  tree.insert(1, 1);
  tree.insert(7, 7);
  tree.delete(1);
  tree.delete(3);
  tree.delete(2);
  t.is(tree._root.key, 6);
  t.is(tree._root.value, 6);
  t.is(tree._root.left.key, 4);
  t.is(tree._root.left.value, 4);
  t.is(tree._root.left.right.key, 5);
  t.is(tree._root.left.right.value, 5);
  t.is(tree._root.right.key, 7);
  t.is(tree._root.right.value, 7);
});

/**
 *       _6_                       _4_
 *      /   \                     /   \
 *     2     7  -> delete(8) ->  2     6
 *    / \     \                 / \   / \
 *   1   4     8               1   3 5   7
 *      / \
 *     3   5
 */
test('should correctly balance the left right case', function (t) {
  var tree = new AvlTree();
  tree.insert(6, 6);
  tree.insert(2, 2);
  tree.insert(7, 7);
  tree.insert(1, 1);
  tree.insert(8, 8);
  tree.insert(4, 4);
  tree.insert(3, 3);
  tree.insert(5, 5);
  tree.delete(8);
  t.is(tree._root.key, 4);
  t.is(tree._root.value, 4);
  t.is(tree._root.left.key, 2);
  t.is(tree._root.left.value, 2);
  t.is(tree._root.left.left.key, 1);
  t.is(tree._root.left.left.value, 1);
  t.is(tree._root.left.right.key, 3);
  t.is(tree._root.left.right.value, 3);
  t.is(tree._root.right.key, 6);
  t.is(tree._root.right.value, 6);
  t.is(tree._root.right.left.key, 5);
  t.is(tree._root.right.left.value, 5);
  t.is(tree._root.right.right.key, 7);
  t.is(tree._root.right.right.value, 7);
});

/**
 *       _3_                       _5_
 *      /   \                     /   \
 *     2     7  -> delete(1) ->  3     7
 *    /     / \                 / \   / \
 *   1     5   8               2   4 6   8
 *        / \
 *       4   6
 */
test('should correctly balance the right left case', function (t) {
  var tree = new AvlTree();
  tree.insert(3, 3);
  tree.insert(2, 2);
  tree.insert(7, 7);
  tree.insert(1, 1);
  tree.insert(8, 8);
  tree.insert(5, 5);
  tree.insert(4, 4);
  tree.insert(6, 6);
  tree.delete(1);
  t.is(tree._root.key, 5);
  t.is(tree._root.value, 5);
  t.is(tree._root.left.key, 3);
  t.is(tree._root.left.value, 3);
  t.is(tree._root.left.left.key, 2);
  t.is(tree._root.left.left.value, 2);
  t.is(tree._root.left.right.key, 4);
  t.is(tree._root.left.right.value, 4);
  t.is(tree._root.right.key, 7);
  t.is(tree._root.right.value, 7);
  t.is(tree._root.right.left.key, 6);
  t.is(tree._root.right.left.value, 6);
  t.is(tree._root.right.right.key, 8);
  t.is(tree._root.right.right.value, 8);
});

test('should take the right child if the left does not exist', function (t) {
  var tree = new AvlTree();
  tree.insert(1, 1);
  tree.insert(2, 2);
  tree.delete(1);
  t.is(tree._root.key, 2);
  t.is(tree._root.value, 2);
});

test('should take the left child if the right does not exist', function (t) {
  var tree = new AvlTree();
  tree.insert(2, 2);
  tree.insert(1, 1);
  tree.delete(2);
  t.is(tree._root.key, 1);
  t.is(tree._root.value, 1);
});

test('should get the right child if the node has 2 leaf children', function (t) {
  var tree = new AvlTree();
  tree.insert(2, 2);
  tree.insert(1, 1);
  tree.insert(3, 3);
  tree.delete(2);
  t.is(tree._root.key, 3);
  t.is(tree._root.value, 3);
});

test('should get the in-order successor if the node has both children', function (t) {
  var tree = new AvlTree();
  tree.insert(2, 2);
  tree.insert(1, 1);
  tree.insert(4, 4);
  tree.insert(3, 3);
  tree.insert(5, 5);
  tree.delete(2);
  t.is(tree._root.key, 3);
  t.is(tree._root.value, 3);
});
