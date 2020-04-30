/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Karl STEIN
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import extend from '../src/extend';

it('extend(null, null) should return null', () => {
  expect(extend(null, null)).toEqual(null);
});

it('extend(undefined, undefined) should return undefined', () => {
  expect(extend(undefined, undefined)).toEqual(undefined);
});

// Objects

it('extend() should replace null values', () => {
  const b = { a: 1 };
  expect(extend(null, b)).toEqual(b);
});

it('extend() should replace undefined values', () => {
  const b = { a: 1 };
  expect(extend(undefined, b)).toEqual(b);
});

it('extend() should ignore null values', () => {
  const a = { a: 1 };
  expect(extend(a, null)).toEqual(a);
});

it('extend() should ignore undefined values', () => {
  const a = { a: 1 };
  expect(extend(a, undefined)).toEqual(a);
});

it('extend() should replace existing attributes', () => {
  const a = { a: 1 };
  const b = { a: 2 };
  expect(extend(a, b)).toEqual(b);
});

it('extend() should merge new attributes', () => {
  const a = { a: 1 };
  const b = { b: 2 };
  const r = { a: 1, b: 2 };
  expect(extend(a, b)).toEqual(r);
});

it('extend() should merge objects non recursively', () => {
  const a = { a: { b: 1, c: 3 }, d: 4 };
  const b = { a: { b: 2 } };
  const r = { a: { b: 2 }, d: 4 };
  expect(extend(a, b)).toEqual(r);
});

it('should not modify input array', () => {
  const a = { array: null };
  const b = { array: [1, 2, 3] };
  expect(extend(a, b).array).not.toBe(b.array);
});

// Arrays

it('extend() should merge arrays by replacing index value', () => {
  const a = [0, 1];
  const b = [0, 2];
  expect(extend(a, b)).toEqual(b);
});

it('extend() should ignore undefined values when merging arrays', () => {
  const a = [0, 1];
  const b = [0, undefined];
  const r = [0, 1];
  expect(extend(a, b)).toEqual(r);
});

it('extend() should merge arrays non recursively', () => {
  const a = [1, [2, [3]]];
  const b = [undefined, [4, [undefined, 5], 6], 7];
  const r = [1, [4, [undefined, 5], 6], 7];
  expect(extend(a, b)).toEqual(r);
});

it('should not modify input array', () => {
  const a = null;
  const b = [1, 2, 3];
  expect(extend(a, b)).not.toBe(b);
});

// Arrays to Object

it('extend() should merge arrays into objects', () => {
  const a = {};
  const b = [1];
  const r = { 0: 1 };
  expect(extend(a, b)).toEqual(r);
});