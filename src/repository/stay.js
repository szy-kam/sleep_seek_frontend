const url = 'http://localhost:8080/stays/';

export async function StayRepository(id){
    const response = await fetch(url + id);
    if (response.status === 200)
        return response.json()
    else
        return []
}