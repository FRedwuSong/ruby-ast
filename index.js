import childProcess from 'child_process'
import { promisify } from 'util'
const exec = promisify(childProcess.exec)

function normalize (source) {
  return source.replace(/"/g, '\\"').replace(/'/g, "\\'")
}

export function convert (source, options = {}) {
  const program = options.program || 'ruby'
  const script = `Ripper.sexp('${normalize(source)}').to_json`
  const command = `${program} -r ripper -r json -e "print ${script}"`
  return exec(command).then(function ({ stdout, stderr }) {
    return JSON.parse(stdout)
  })
}
