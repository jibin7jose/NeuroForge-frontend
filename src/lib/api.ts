export const API_URL = 'http://localhost:3001';

export async function getProjects() {
    const res = await fetch(`${API_URL}/projects`);
    return res.json();
}

export async function getEvolutionHistory() {
    const res = await fetch(`${API_URL}/projects/evolution`);
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
