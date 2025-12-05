import { http, HttpResponse, delay } from 'msw';
import { mockAutomationActions, simulateWorkflow } from './mocks';
import type { WorkflowData } from '../types/workflow.types';

export const handlers = [
  // GET /automations - returns list of automation actions
  http.get('/api/automations', async () => {
    await delay(300); // Simulate network delay
    return HttpResponse.json(mockAutomationActions);
  }),

  // POST /simulate - simulates workflow execution
  http.post('/api/simulate', async ({ request }) => {
    await delay(500); // Simulate network delay
    const workflow = (await request.json()) as WorkflowData;
    const result = simulateWorkflow(workflow);
    return HttpResponse.json(result);
  }),
];
