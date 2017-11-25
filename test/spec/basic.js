import test from 'ava'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { convert } from '../../build/ruby-ast'
const read = promisify(fs.readFile)

test('it exposes a convert method', assert => {
  assert.is(typeof convert, 'function')
})

test('it converts ruby code to an abstract syntax tree', async assert => {
  const result = await convert('puts "Hello world!"')
  assert.deepEqual(result, [
    'program',
    [
      [
        'command',
        [
          '@ident',
          'puts',
          [1, 0]
        ],
        [
          'args_add_block',
          [
            [
              'string_literal',
              [
                'string_content',
                [
                  '@tstring_content',
                  'Hello world!',
                  [1, 6]
                ]
              ]
            ]
          ],
          false
        ]
      ]
    ]
  ])
})

test('it escapes the source', async assert => {
  const result1 = await convert('puts "Hello world!"')
  const result2 = await convert("puts 'Hello world!'")
  assert.deepEqual(result1, result2)
})

test('it converts modules', async assert => {
  const input = path.join(__dirname, '../fixture/module/input.rb')
  const output = path.join(__dirname, '../fixture/module/output.json')
  const source = await read(input, 'utf8')
  const result = await convert(source)
  const expected = await read(output, 'utf8')
  assert.deepEqual(result, JSON.parse(expected))
})

test('it converts classes', async assert => {
  const input = path.join(__dirname, '../fixture/class/input.rb')
  const output = path.join(__dirname, '../fixture/class/output.json')
  const source = await read(input, 'utf8')
  const result = await convert(source)
  const expected = await read(output, 'utf8')
  assert.deepEqual(result, JSON.parse(expected))
})

test('it returns null for wrong code', async assert => {
  const result = await convert(']')
  assert.is(result, null)
})

test('it lets you override the default program name', async assert => {
  const result = await convert(']', { program: 'ruby' })
  assert.is(result, null)
})
