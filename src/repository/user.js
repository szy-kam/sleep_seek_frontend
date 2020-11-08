export async function AddUserRepo(user){
    const response = await fetch('http://localhost:8080/user',{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Origin': '*',
        },
        body: JSON.stringify(user)
      });
    return response;
}