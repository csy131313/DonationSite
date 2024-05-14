


const CardDetails = ({func}) => {

    return ( <>
    <label>credit card number</label>
    <input type="number" placeholder="..../..../..../...." name="numberCard" onBlur={func}/>
    <label>date</label>
    <input type="Date" placeholder="../.." name="date" onBlur={func}/>
    <label>cvv</label>
    <input type="number" placeholder="cvv" name="cvv" onBlur={func}/>
    <label>id</label>
    <input type="text" placeholder="id" name="id" onBlur={func}/>
    
    </> );
}
 
export default CardDetails;