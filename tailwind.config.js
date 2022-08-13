// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            colors: {
                brandRed: '#F26222',
                brandPrimaryBlue: '#0089D0',
                brandPurple: 'rgb(178, 1, 172)',
                brandOrange: 'rgb(242, 98, 34)',
                brandBlue: 'rgb(0, 167, 255)',
                brandMedGray: '#707070',
                brandGray: 'rgb(228,228,228)',
                brandLightGray: '#E8E8E8',
                brandTextDark: '#333333',
            },
            width: {
                149: '149px',
            },
            height: {
                149: '149px',
            },
            maxHeight: {
                '3/4': '75%',
            },
            fontSize: {
                '2xs': '.625rem',
                '3xs': '.5rem',
                '4xs': '.325rem',
                '5xs': '.25rem',
            },
        },
    },
    plugins: [],
};
