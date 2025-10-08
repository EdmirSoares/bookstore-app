const primary = {
    '50': '#fff5ed',
    '100': '#ffe8d4',
    '200': '#ffcea8',
    '300': '#ffab71',
    '400': '#ff7832', //main
    '500': '#fe5811',
    '600': '#ef3e07',
    '700': '#c62a08',
    '800': '#9d240f',
    '900': '#7e2010',
    '950': '#440c06',
};

const neutral = {
    '50': '#f5f5f6',
    '100': '#e6e6e7',
    '200': '#d0d0d1',
    '300': '#afb0b1',
    '400': '#878889',
    '500': '#6b6b6f',
    '600': '#5c5d5e',
    '700': '#4e4f50',
    '800': '#444446',
    '900': '#353536',
    '950': '#262626',
};

const darkBackground = {
    '50': '#f5f7fa',
    '100': '#eaeef4',
    '200': '#d0dbe7',
    '300': '#a7bdd2',
    '400': '#7899b8',
    '500': '#577da0',
    '600': '#436486',
    '700': '#37516d',
    '800': '#31455b',
    '900': '#2c3b4e',
    '950': '#1f2936',
};

export default {
    light: {
        text: '#3B3535',
        surfaceText: '#3B3535',
        background: '#F3F2F2',
        backgroundForeground: '#FFFFFF',
        warning500: '#FF0000',
        warning600: '#BD0A0A',
        tint: '#2f95dc',
        tabIconDefault: '#ccc',
        tabIconSelected: '#2f95dc',
        tabBarBackground: '#FFFFFF',
        tabBarActiveBackgroundColor: '#E5E5E5',
        primary,
        neutral,
    },
    dark: {
        text: neutral['50'],
        surfaceText: '#ffffff',
        background: darkBackground['900'],
        backgroundForeground: darkBackground['800'],
        tabBarBackground: '#111111',
        warning500: '#FF0000',
        warning600: '#BD0A0A',
        tint: '#2f95dc',
        tabIconDefault: '#C4CCCC',
        tabIconSelected: '#FF7832',
        tabBarActiveBackgroundColor: '#1B1B1B',
        primary,
        neutral,
    },
};
