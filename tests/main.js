const fs = require('fs')
const path = require('path')

const expect = require('unexpected')
const Patch = require('../')
const unidiffString = fs.readFileSync(
  path.join(__dirname, './example.patch'),
  'utf-8'
)
const patch = Patch.fromUnidiff(unidiffString)
const expectedPatchObject = {
  type: 'unidiff-object',
  oldHeader: '2016-10-19 15:52:24 -00',
  oldRelativeFilePath: 'cli.js',
  newHeader: '2016-10-19 16:35:11 -00',
  newRelativeFilePath: '/somewhere/new/file.js',
  hunks: [{
    oldStart: 16,
    oldLines: 3,
    newStart: 16,
    newLines: 3,
    lines: [
      '-\t\'Options\',',
      '-\t\'  --all   Get all names instead of a random name\'',
      '-])',
      '+\t\'Options\',',
      '+\t\'  --all   Get all names instead of just a random name\',',
      '+])',
    ],
  }],
}

expect(patch.object, 'to equal', expectedPatchObject)
