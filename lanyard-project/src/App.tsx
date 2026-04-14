import { useEffect } from 'react'
import Lanyard from './components/Lanyard'
import './App.css'

function App() {
  // Listen for theme color from the parent page via postMessage
  // This keeps the iframe background in sync with the portfolio's theme
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'setBg') {
        document.documentElement.style.background = event.data.color;
        document.body.style.background = event.data.color;
      }
    };
    window.addEventListener('message', handleMessage);

    // Tell parent we're ready to receive the color
    window.parent.postMessage({ type: 'lanyardReady' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, background: 'transparent' }}>
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} transparent={true} />
    </div>
  )
}

export default App