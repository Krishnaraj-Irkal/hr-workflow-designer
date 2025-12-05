import { http, HttpResponse, delay } from 'msw';
import { mockAutomationActions, simulateWorkflow } from './mocks';

export const handlers = [
  // GET /automations - returns list of automation actions
  http.get('/api/automations', async () => {
    await delay(300); // Simulate network delay
    return HttpResponse.json(mockAutomationActions);
  }),

  // POST /simulate - simulates workflow execution
  http.post('/api/simulate', async ({ request }) => {
    await delay(500); // Simulate network delay
    const workflow = await request.json();
    const result = simulateWorkflow(workflow as any);
    return HttpResponse.json(result);
  }),
];
