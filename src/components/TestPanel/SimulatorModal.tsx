import { useEffect, useRef } from 'react'
import { useSimulatorStore } from '../../hooks/useSimulatorStore'
import { CheckCircle, XCircle, Clock, X, Play, AlertCircle } from 'lucide-react'

export const SimulatorModal = () => {
    const isOpen = useSimulatorStore((s) => s.isOpen)
    const runs = useSimulatorStore((s) => s.runs)
    const close = useSimulatorStore((s) => s.close)
    const startRun = useSimulatorStore((s) => s.startRun)
    const dialogRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
        }
        if (isOpen) {
            document.addEventListener('keydown', onKeyDown)
            setTimeout(() => dialogRef.current?.focus(), 0)
        }
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [isOpen, close])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 animate-fade-in" aria-hidden="true" />
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="simulator-title"
                tabIndex={-1}
                className="relative w-full max-w-4xl mx-4 sm:mx-6 bg-white rounded-2xl shadow-2xl border border-gray-200 animate-slide-in"
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div>
                            <h3 id="simulator-title" className="text-lg font-semibold text-gray-900">Workflow Simulator</h3>
                            <p className="text-xs text-gray-600">Run simulations and inspect sequential results</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => startRun()}
                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
                        >
                            <Play className="w-4 h-4" />
                            Run Simulator
                        </button>
                        <button
                            onClick={close}
                            aria-label="Close"
                            className="p-2 rounded-lg hover:bg-gray-100"
                        >
                            <X className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>

                <div className="px-5 py-4 max-h-[75vh] overflow-y-auto">
                    {runs.length === 0 ? (
                        <div className="flex items-center justify-center h-48 text-gray-500">
                            <div className="text-center">
                                <AlertCircle className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                                <p>No runs yet. Start a simulation to see results.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {runs.map((run, idx) => (
                                <div key={run.id} className="border border-gray-200 rounded-xl">
                                    <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200 rounded-t-xl">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">{idx + 1}</div>
                                            <div className="text-sm text-gray-700">Started {new Date(run.startedAt).toLocaleTimeString()}</div>
                                            {run.finishedAt && (
                                                <div className="text-xs text-gray-500">• Finished {new Date(run.finishedAt).toLocaleTimeString()}</div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {run.status === 'in_progress' && (
                                                <div className="flex items-center gap-1 text-blue-600"><Clock className="w-4 h-4 animate-spin" /><span className="text-sm">In Progress</span></div>
                                            )}
                                            {run.status === 'success' && (
                                                <div className="flex items-center gap-1 text-green-600"><CheckCircle className="w-4 h-4" /><span className="text-sm">Success</span></div>
                                            )}
                                            {run.status === 'failure' && (
                                                <div className="flex items-center gap-1 text-red-600"><XCircle className="w-4 h-4" /><span className="text-sm">Failed</span></div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-4 space-y-3">
                                        {run.metrics && (
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                                <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm">Nodes: {run.metrics.nodeCount}</div>
                                                <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm">Edges: {run.metrics.edgeCount}</div>
                                                <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm">Steps: {run.metrics.stepCount}</div>
                                                <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm">Duration: {Math.max(0, Math.round(run.metrics.durationMs))} ms</div>
                                            </div>
                                        )}

                                        {run.status === 'in_progress' && (
                                            <div className="flex items-center justify-center py-10">
                                                <div className="text-center">
                                                    <Clock className="w-12 h-12 mx-auto mb-2 text-blue-500 animate-spin" />
                                                    <p className="text-gray-600">Simulating workflow...</p>
                                                </div>
                                            </div>
                                        )}

                                        {run.result?.errors && run.result.errors.length > 0 && (
                                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                                <div className="flex items-start gap-2">
                                                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-red-900 mb-2">Validation Errors</h4>
                                                        <ul className="space-y-1">
                                                            {run.result.errors.map((error, i) => (
                                                                <li key={i} className="text-sm text-red-700">- {error}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {run.result?.success && (
                                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                                    <span className="font-semibold text-green-900">Workflow simulation completed successfully!</span>
                                                </div>
                                            </div>
                                        )}

                                        {run.result?.steps && run.result.steps.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold mb-2">Execution Steps</h4>
                                                <div className="space-y-2">
                                                    {run.result.steps.map((step, i) => (
                                                        <div key={`${run.id}-${step.nodeId}-${i}`} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex-shrink-0">{i + 1}</div>
                                                            <div className="flex-1">
                                                                <div className="font-medium text-sm">{step.nodeTitle}</div>
                                                                <div className="text-xs text-gray-600 mt-1">{step.message}</div>
                                                                {step.timestamp && (
                                                                    <div className="text-xs text-gray-400 mt-1">{new Date(step.timestamp).toLocaleTimeString()}</div>
                                                                )}
                                                            </div>
                                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {run.error && (
                                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                                <div className="flex items-center gap-2 text-red-700">
                                                    <XCircle className="w-5 h-5" />
                                                    <span className="text-sm">{run.error}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

