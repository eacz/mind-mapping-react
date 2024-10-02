import { Edge, Node } from 'reactflow'

export const saveMindMap = (
  nodes: Node<
    {
      label: string
    },
    string | undefined
  >[],
  edges: Edge[]
) => {
  const data = { nodes, edges }
  localStorage.setItem('mind-maps-react', JSON.stringify(data))
}

export const loadMindMap = () => {
  const data = localStorage.getItem('mind-maps-react')
  return data ? JSON.parse(data) : null
}
