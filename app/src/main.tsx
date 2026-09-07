import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import './case-study.css'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
if (container.hasChildNodes() && container.querySelector('main')) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
