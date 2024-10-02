import { useCallback, useState } from 'react'
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  useEdgesState,
  useNodesState,
} from 'reactflow'

import 'reactflow/dist/style.css'

import { loadMindMap, saveMindMap } from '../utils/storage'

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Mind Map' },
    position: { x: 0, y: 0 },
  },
]

const initialEdges: Edge[] = []

const connectionLineStyle = {
  stroke: '#9999',
  strokeWidth: 3,
}
const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' }

export const MindNode = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges)
  const [name, setName] = useState('')

  const addNode = () => {
    if (!name) return
    setNodes((e) =>
      e.concat({
        id: (e.length + 1).toString(),
        data: { label: `${name}` },
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      })
    )
    setName('')
  }

  const handleSave = () => {
    saveMindMap(nodes, edges)
  }

  const handleLoad = () => {
    const loadedData = loadMindMap()
    if (loadedData) {
      setNodes(loadedData.nodes)
      setEdges(loadedData.edges)
    }
  }

  const refreshPage = () => {
    window.location.reload()
  }

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  )

  return (
    <div id='container' style={{ width: '100%', maxWidth: '100wh', height: 'calc(100vh - 100px) ' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionLineStyle={connectionLineStyle}
        defaultEdgeOptions={defaultEdgeOptions}
        onConnect={onConnect}>
        <Controls />

        <Background variant={BackgroundVariant.Lines} gap={12} size={1} />

        <MiniMap
          nodeColor={(n) => {
            if (n.type === 'input') return 'blue'

            return '#FFCC00'
          }}
        />
      </ReactFlow>
      <div>
        <input type='text' onChange={(e) => setName(e.target.value)} value={name} name='title' />
        <button type='button' onClick={addNode} disabled={!name}>
          Add Node
        </button>
      </div>
      <div>
        <button type='button' onClick={handleSave}>
          Save Mind Map
        </button>
        <button type='button' onClick={handleLoad}>
          Load Mind Map
        </button>
        <button type='button' onClick={refreshPage}>
          Reset Mind Map
        </button>
      </div>
    </div>
  )
}
