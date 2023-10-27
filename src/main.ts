/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import './assets/main.css'

import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primeicons/primeicons.css'
import "primeflex/primeflex.css";

import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import PrimeVue from 'primevue/config';
import App from './App.vue'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

const app = createApp(App)

app.use(PrimeVue)
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('Card', Card)
app.component('Splitter', Splitter)
app.component('SplitterPanel', SplitterPanel)
app.component('Toast', Toast)
app.use(ToastService);

app.use(VueGoogleMaps, {
  installComponents: true,
  installDirectives: true,
  installMutations: true,
  load: {
    key: `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`,
    libraries: "places"
  }
})
app.mount('#app')
