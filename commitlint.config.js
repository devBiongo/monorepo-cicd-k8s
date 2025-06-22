export default {
  rules: {
    'type-enum': [0],
    'type-case': [0],
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
    'custom-format': [2, 'always']
  },
  plugins: [
    {
      rules: {
        'custom-format': ({ header }) => {
          // const currBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
          // if (header.indexOf(`#${currBranch}`) === -1) {
          //   return [false, `add #${currBranch}`];
          // }
          return [true];
        }
      }
    }
  ]
};
