import React, {useState, useEffect} from 'react';

const MiApi = () => {

    const [aves, setAves] = useState([])
    const [search, setSearch] = useState("")
    const [order, setorder] = useState("ASC")


    const baseUrl = "https://aves.ninjas.cl/api/birds"

    const showData = async () => {
        const response = await fetch(baseUrl)
        const data = await response.json()
        setAves(data)
    }

const searcher = (e) => {
    setSearch(e.target.value)
}

const results = !search ? aves : aves.filter((dato)=> dato.name.spanish.toLowerCase().includes(search.toLocaleLowerCase()))
  
useEffect( ()=> {
 showData()
}, [])

const sorting =(col)=>{
    if (order === "ASC"){
        const sorted = [...results].sort((a,b) =>
        a.name.spanish.toLowerCase() > b.name.spanish.toLowerCase() ? 1 : -1
        );
        setAves(sorted);
        setorder("DSC")
    }
    if (order === "DSC"){
        const sorted = [...results].sort((a,b) =>
        a.name.spanish.toLowerCase() < b.name.spanish.toLowerCase() ? 1 : -1
        );
        setAves(sorted);
        setorder("ASC")
    }



};

    return (
        <div className='container'>
            <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control'/>
            <table className='table table-striped table-hover mt-5 shadow-lg'>
                <thead class="bg-info">
                    <tr className='bg-curso'>
                        <th onClick={() => sorting(".name.spanish")}>Nombre Español</th>
                        <th>Nombre Latin</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((ave) => (
                        <tr key={ave.uid}>
                            <td>{ave.name.spanish}</td>
                            <td>{ave.name.latin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MiApi;