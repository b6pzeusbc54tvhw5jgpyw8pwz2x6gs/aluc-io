module.exports = {
  importStatementFormatter({ importStatement }) {
    return importStatement.replace(/;$/, '');
  },
  aliases: {
    cx: 'node_modules/classnames',
  }
}

