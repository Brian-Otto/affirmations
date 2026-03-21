import { registerSW } from 'virtual:pwa-register'

export const updateSW = registerSW({
  onNeedRefresh() {
    window.dispatchEvent(new Event('pwa-update'))
  },
  onOfflineReady() {
    window.dispatchEvent(new Event('pwa-offline-ready'))
  },
})