import { useEffect } from "react"
import { useParams, useLocation, useNavigate} from "react-router-dom"

const MovieInformation = (props) => {
    const location = useLocation()
    let id = useParams().id
    const navigate = useNavigate()

    useEffect(() => {
        console.log(`/movies/${id}`)
        {console.log('location', location.state)}
    }, [])

    
    return(
        <div>
            <h2>Filmtitel: {location.state.movieTitle}</h2>
            <img src={`${location.state.moviePicture}`}/>
            <p>{location.state.longMovieDescrition}</p>
            {console.log(useParams())}
            {console.log('location', location.state)}
        </div>
    )
}

export default MovieInformation;