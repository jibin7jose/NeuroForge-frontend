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

export async function getMeshTelemetry() {
    return fetchJson('/projects/mesh/telemetry');
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

export async function applyRefactor(code: string, language: string, strategyId: string) {
    return fetchJson('/projects/refactor/apply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language, strategyId }),
    });
}

export async function getPRMetadata(strategyId: string) {
    return fetchJson('/projects/refactor/pr-metadata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ strategyId }),
    });
}

export async function createPR(projectId: number, strategyId: string, patch: string) {
    return fetchJson('/projects/refactor/pr-create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, strategyId, patch }),
    });
}

export async function getSuggestions(code: string, language: string) {
    return fetchJson('/projects/suggestions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
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



export async function getAssistantProfile() {
    return fetchJson('/projects/assistant/profile');
}

export async function getSkills(projectId?: number) {
    const suffix = projectId ? `?projectId=${projectId}` : '';
    return fetchJson(`/projects/skills${suffix}`);
}

export async function getWeaknesses(projectId?: number) {
    const suffix = projectId ? `?projectId=${projectId}` : '';
    return fetchJson(`/projects/weaknesses${suffix}`);
}

export async function getProjectSuggestions(projectId?: number) {
    const suffix = projectId ? `?projectId=${projectId}` : '';
    return fetchJson(`/projects/suggestions${suffix}`);
}

export async function rescanProject(projectId: number) {
    return fetchJson(`/projects/rescan/${projectId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function getTrends(projectId?: number) {
    const suffix = projectId ? `?projectId=${projectId}` : '';
    return fetchJson(`/projects/trends${suffix}`);
}

export async function updateAssistantProfile(profile: any) {
    return fetchJson('/projects/assistant/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
    });
}
