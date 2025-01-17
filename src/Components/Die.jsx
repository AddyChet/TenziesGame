/* eslint-disable react/prop-types */

const Die = ({value, isHeld, hold, id}) => {
    const style = { backgroundColor: isHeld ? "#59E391" : "white", color: isHeld ? "white" : "black",}
  return (
    <>
    <div className="btn" style={style} onClick={()=> hold(id)}>{value}</div>
    </>
    
  )
}

export default Die