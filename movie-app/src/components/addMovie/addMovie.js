const AddMovie = () => {
    return(
        <div>
            <form>
                <input type='text' placeholder='Filmtitel'></input>
                <input type='text' placeholder='Kort beskrivning'></input>
                <input type='text' placeholder='Lång beskrivning'></input>
                <input type='file' placeholder='bild'></input>
                <input type='submit' value='Lägg till film'></input>
            </form>
        </div>
    )
}

export default AddMovie;