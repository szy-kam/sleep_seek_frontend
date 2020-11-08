const url = 'http://localhost:8080/stays';

export async function StaysCardRepository(pageNumber,pageSize){
    let newUrl = url+'?pageNumber=' + pageNumber + '&pageSize=' + pageSize;
    const response = await fetch(newUrl, {
        headers: {
            "Origin": "*"
        }
    });
    if (response.status === 200)
        return response.json()
    else
        return []
}
