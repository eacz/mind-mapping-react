import { useCallback, useState } from 'react'
import ReactFlow, {
  addEdge,
  Connection,
  Controls,
  Edge,
  MiniMap,
  useEdgesState,
  useNodesState,
} from 'reactflow'

import 'reactflow/dist/style.css'

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Mind Map' },
    position: { x: 0, y: 0 },
  },
]

const initialEdges: Edge[] = []

export const MindNode = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges)
  const [name, setName] = useState('')

  const addNode = () => {
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
        onConnect={onConnect}>
        <Controls />

        <MiniMap
          nodeColor={(n) => {
            if (n.type === 'input') return 'blue'

            return '#FFCC00'
          }}
        />
      </ReactFlow>
      <div>
        <input type='text' onChange={(e) => setName(e.target.value)} name='title' />
        <button type='button' onClick={addNode}>
          Add Node
        </button>
      </div>
    </div>
  )
}
