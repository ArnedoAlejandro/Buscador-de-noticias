import { useState, useEffect, createContext } from "react";
import axios from "axios"

const NoticiasContext = createContext()


const NoticiasProvider = ({children}) => {

    const [ categoria, setCategoria ] = useState("general")

    const [ noticias, setNoticias ] = useState([])

    const [ pagina, setPagina ] = useState(1)

    const [ totalNoticias, setTotalNoticia ] = useState(0)



//USEEFFECT CONSULTA API
    useEffect( () =>{
        const consultarApi = async ()=>{
            const url = `https://newsapi.org/v2/top-headlines?country=ar&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`

            const { data } = await axios(url)
            setNoticias(data.articles)
            setTotalNoticia(data.totalResults)
            setPagina(1)
        }
        consultarApi()
    },[categoria])

    useEffect( () =>{
        const consultarApi = async ()=>{
            const url = `https://newsapi.org/v2/top-headlines?country=ar&page=${pagina}&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`

            const { data } = await axios(url)
            setNoticias(data.articles)
            setTotalNoticia(data.totalResults)
            
        }
        consultarApi()
    },[pagina])



//ESTADO DEL FORMULARIO
    const handleChangeCategoria = e =>{
        setCategoria(e.target.value)
    }


//FUNCION DE CAMBIO DE PAGINACION

const handleChangePagina = ( e, valor ) =>(
        setPagina(valor)
    )    

  return (
    <NoticiasContext.Provider
        value={{
            categoria,
            handleChangeCategoria,
            noticias,
            totalNoticias,
            handleChangePagina,
            pagina
        }}
    >
        {children}
    </NoticiasContext.Provider>
  )

}
export{
    NoticiasProvider
}

export default NoticiasContext
