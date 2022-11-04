import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './pages/index'
import './index.css'

import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Index />
    </DndProvider>
  </React.StrictMode>
)
