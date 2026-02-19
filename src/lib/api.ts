export const API_URL = 'http://localhost:3001';

export async function getProjects() {
    const res = await fetch(`${API_URL}/projects`);
    return res.json();
}

export async function getBackendHealth() {
    const res = await fetch(`${API_URL}/projects/health`);
    return res.json();
}

export async function getEvolutionHistory() {
    const res = await fetch(`${API_URL}/projects/evolution`);
    return res.json();
}

export async function getReadinessDelta() {
    const res = await fetch(`${API_URL}/projects/readiness/delta`);
    return res.json();
}

export async function getProjectHistory(id: number) {
    const res = await fetch(`${API_URL}/projects/history/${id}`);
    return res.json();
}



export async function analyzeCode(code: string, language: string) {
    const res = await fetch(`${API_URL}/projects/analyze`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
    });
    return res.json();
}

export async function importProject(repoUrl: string) {
    const res = await fetch(`${API_URL}/projects/import`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoUrl }),
    });
    return res.json();
}

export async function getInterviewFeedback(
    question: string,
    answer: string,
    telemetry?: { sessionId?: string; questionEventId?: string },
) {
    const res = await fetch(`${API_URL}/projects/interview/feedback`, {
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
    return res.json();
}


