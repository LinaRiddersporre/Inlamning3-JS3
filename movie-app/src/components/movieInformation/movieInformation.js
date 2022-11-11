import { useEffect } from "react"
import { useParams, useLocation, useNavigate} from "react-router-dom"

const MovieInformation = () => {
    const location = useLocation()


    
    return(
        <div>
            <h2>Filmtitel: {location.state}</h2>
            {/* <img src={`${location.state.moviePicture}`}/> */}
            {/* <p>{location.state.longMovieDescrition}</p> */}
            {console.log('location', location.state)}
        </div>
    )
}

export default MovieInformation;