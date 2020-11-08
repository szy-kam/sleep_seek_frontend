const url = 'http://localhost:8080/stays/';

export async function GetStayById(id){
    const response = await fetch(url + id);
    if (response.status === 200)
        return response.json()
    else
        return []
}

export async function DeleteStayById(id){
    await fetch(url + id,{
        method: 'DELETE'
      });
}


export async function AddStayRepo(stay){
    const response = await fetch('http://localhost:8080/stays',{
        method: 'POST', 
        headers: {
            'Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stay)
      });
    return response;
}

export async function EditStayRepo(stay){
    await fetch(url + stay.id, {
        method: 'PUT', 
        headers: {
          'Origin': '*',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(stay)
      })
    .catch(err => {
        console.log(err);
    })
    .then( response  => {
        return response
    })
}
// TODO error catch
