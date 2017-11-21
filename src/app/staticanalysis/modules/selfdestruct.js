var name = 'Selfdestruct: '
var desc = 'Be aware of caller contracts.'
var categories = require('./categories')
var common = require('./staticAnalysisCommon')

function selfdestruct () {
  this.relevantNodes = []
}

selfdestruct.prototype.visit = function (node) {
  if (common.isSelfdestructCall(node)) {
    this.relevantNodes.push(node)
  }
}

selfdestruct.prototype.report = function () {
  return this.relevantNodes.map(function (item, i) {
    return {
      warning: `<span>Use of selfdestruct: can block calling contracts unexpectedly. Be especially careful if this contract is planed to be used by other contracts (i.e. library contracts, interactions). Selfdestruction of callee contracts can leave callers in an inoperable state.</span>`,
      location: item.src,
      more: 'https://www.coindesk.com/ethereum-client-bug-freezes-user-funds-fallout-remains-uncertain/'
    }
  })
}

module.exports = {
  name: name,
  description: desc,
  category: categories.SECURITY,
  Module: selfdestruct
}
