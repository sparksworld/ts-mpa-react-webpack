import './assets/sass/style.scss';

declare module 'react' {
    interface Component {
        [x: string]: any
    }
}