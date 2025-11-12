import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import restrict from '@/directives/restrict.js'

// Bootstrap CSS + JS (tooltips/modals necesitan Popper)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { createCatalogService } from '@/services/catalog.service.js' // 👈
import { createServices, ServiceKeys } from '@/services'           // 👈
import 'bootstrap' // JS (opcional si no usarás tooltips/modals)


async function bootstrap () {
  const app = createApp(App)

  // 3) catálogo: crear servicio, precargar (usa localStorage) e inyectar
  const catalog = createCatalogService()
  try {
    await catalog.ensureLoaded()   // 👈 trae /catalogs/map si no existe en LS
  } catch (e) {
    console.warn('No se pudieron precargar catálogos desde API, uso cache local si existe.', e)
  }
  app.provide('catalog', catalog)  // 👈 luego lo usas con inject('catalog')

  // Servicios únicos (DI)
  const services = createServices()                                  // 👈
  app.provide(ServiceKeys.Program, services[ServiceKeys.Program])    // 👈
  app.provide(ServiceKeys.Comercial, services[ServiceKeys.Comercial])// 👈
  app.directive('restrict', restrict) // ← v-restrict disponible en toda la app

  // 4) montar
  app.mount('#app')
}

bootstrap()
