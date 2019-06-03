import './assets/sass/style.scss';
declare module 'react' {
    interface Component {
        $axios: any;
    }
}
