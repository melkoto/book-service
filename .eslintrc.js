module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es2021': true,
    },
    'extends': ['eslint:recommended', 'prettier', 'plugin:import/errors', 'plugin:import/warnings'],
    'overrides': [
        {
            'env': {
                'node': true,
            },
            'files': [
                '.eslintrc.{js,cjs}',
            ],
            'parserOptions': {
                'sourceType': 'script',
            },
        },
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
    },
    'rules': {
        'indent': [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'never',
        ],
        'import/order': [
            1,
            {
                'groups':
                    [
                        'external',
                        'builtin',
                        'internal',
                        'sibling',
                        'parent',
                        'index',
                    ],
            },
        ],
    },
}
