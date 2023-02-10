import { createRoot } from 'react-dom/client'
import App from './app/App'
import './index.css'

const main = document.getElementById('root');
const root = createRoot(main);
root.render(<App />)