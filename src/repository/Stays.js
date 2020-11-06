const url = 'http://localhost:8181/api/stays';

export async function StaysCardRepository(){
    const response = await fetch(url);
    if (response.status === 200)
        return response.json()
    else
        return []
}
