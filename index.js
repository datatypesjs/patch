const diff = require('diff')

module.exports = class Patch {
  constructor (options = {}) {
    Object.assign(this, options)
  }

  static fromUnidiff (unidiff) {
    const patches = diff.parsePatch(unidiff)

    if (patches.length > 1) {
      throw new Error('Only one one patch per file is currently supported')
    }

    patches[0].oldRelativeFilePath = patches[0].oldFileName
    delete patches[0].oldFileName

    patches[0].newRelativeFilePath = patches[0].newFileName
    delete patches[0].newFileName

    patches[0].type = 'unidiff-object'

    return new Patch(patches[0])
  }

  get unidiff () {

  }

  get object () {
    const {
      type,
      oldHeader,
      oldRelativeFilePath,
      newHeader,
      newRelativeFilePath,
      hunks,
    } = this

    return {
      type,
      oldHeader,
      oldRelativeFilePath,
      newHeader,
      newRelativeFilePath,
      hunks,
    }
  }
  toJSON () {
    return this.object
  }

  get string () {
    return `${this.type} to fix ${this.relativeFilePath}`
  }
  toString () {
    return this.string
  }
}
