const url = 'http://localhost:8181/api/stays';

export async function StaysCardRepository(){
    const response = await fetch(url);
    if (response.status === 200)
        return response.json()
    else
        return []
}


// const url = 'http://localhost:8080/stays';

// export async function StaysCardRepository(pageNumber=0,pageSize = 5){
//     let newUrl = url+'?pageNumber=' + pageNumber + '&pageSize=' + pageSize;
//     console.log(newUrl);
//     const response = await fetch(newUrl);
//     if (response.status === 200)
//         return response.json()
//     else
//         return []
// }
