import { create } from 'zustand'
import { useWorkflowStore } from './useWorkflowStore'
import type { SimulationResult } from '../types/workflow.types'

type RunStatus = 'in_progress' | 'success' | 'failure'

interface SimulationRun {
  id: string
  status: RunStatus
  startedAt: string
  finishedAt?: string
  result?: SimulationResult
  error?: string
  metrics?: {
    durationMs: number
    nodeCount: number
    edgeCount: number
    stepCount: number
  }
}

interface SimulatorStore {
  isOpen: boolean
  runs: SimulationRun[]
  open: () => void
  close: () => void
  clearRuns: () => void
  startRun: () => Promise<void>
}

export const useSimulatorStore = create<SimulatorStore>((set, get) => ({
  isOpen: false,
  runs: [],

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  clearRuns: () => set({ runs: [] }),

  startRun: async () => {
    const { nodes, edges } = useWorkflowStore.getState()
    const id = `run-${Date.now()}`
    const startedAt = new Date().toISOString()

    set({ isOpen: true, runs: [...get().runs, { id, status: 'in_progress', startedAt }] })

    try {
      const workflow = { nodes, edges }
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workflow),
      })

      const data: SimulationResult = await response.json()
      const finishedAt = new Date().toISOString()
      const durationMs = new Date(finishedAt).getTime() - new Date(startedAt).getTime()

      set({
        runs: get().runs.map((r) =>
          r.id === id
            ? {
                ...r,
                status: data.success ? 'success' : 'failure',
                finishedAt,
                result: data,
                metrics: {
                  durationMs,
                  nodeCount: nodes.length,
                  edgeCount: edges.length,
                  stepCount: data.steps?.length || 0,
                },
              }
            : r
        ),
      })
    } catch {
      const finishedAt = new Date().toISOString()
      const durationMs = new Date(finishedAt).getTime() - new Date(startedAt).getTime()
      set({
        runs: get().runs.map((r) =>
          r.id === id
            ? {
                ...r,
                status: 'failure',
                finishedAt,
                error: 'Failed to simulate workflow. Please try again.',
                metrics: {
                  durationMs,
                  nodeCount: nodes.length,
                  edgeCount: edges.length,
                  stepCount: 0,
                },
              }
            : r
        ),
      })
    }
  },
}))
