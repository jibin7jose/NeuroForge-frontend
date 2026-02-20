export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchJson(path: string, init?: RequestInit) {
    const res = await fetch(`${API_URL}${path}`, init);
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`HTTP ${res.status} ${res.statusText}: ${body}`);
    }
    return res.json();
}

export async function getProjects() {
    return fetchJson('/projects');
}

export async function getBackendHealth() {
    return fetchJson('/projects/health');
}

export async function getEvolutionHistory() {
    return fetchJson('/projects/evolution');
}

export async function getReadinessDelta() {
    return fetchJson('/projects/readiness/delta');
}

export async function getProjectHistory(id: number) {
    return fetchJson(`/projects/history/${id}`);
}



export async function analyzeCode(code: string, language: string) {
    return fetchJson('/projects/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
    });
}

export async function importProject(repoUrl: string) {
    return fetchJson('/projects/import', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoUrl }),
    });
}

export async function getInterviewFeedback(
    question: string,
    answer: string,
    telemetry?: { sessionId?: string; questionEventId?: string },
) {
    return fetchJson('/projects/interview/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            question,
            answer,
            sessionId: telemetry?.sessionId,
            questionEventId: telemetry?.questionEventId,
        }),
    });
}


