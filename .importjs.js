module.exports = {
  importStatementFormatter({ importStatement }) {
    return importStatement.replace(/;$/, '');
  },
  sortImports: false,
  aliases: {
    cx: 'node_modules/classnames',
  }
}

