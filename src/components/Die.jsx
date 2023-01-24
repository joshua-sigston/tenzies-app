const Die = (props) => {

    const handleClick = (e) => {
        props.onClick(e.target.id)
    }

    const style = { backgroundColor: props.isHeld && 'C0D8C0'}

    return (
        <div    className="die center_by_flex" 
                id={props.id}
                key={props.id} 
                holding={props.isHeld} 
                onClick={handleClick}
                style={style}>
        {props.value}
        </div>
    )
}

export default Die