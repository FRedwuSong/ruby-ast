export default {
  input: 'index.js',
  output: {
    file: 'build/ruby-ast.js',
    format: 'cjs'
  },
  external: ['child_process', 'util'],
  interop: false
}
