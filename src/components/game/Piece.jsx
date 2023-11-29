import '../../styles/pieceType.css'

export default ({ type, left, top }) => {
    let {src, className} = type;
    let style = {left: left, top: top}

    return (
        <div>
            <img
                src={src}
                className={className}
                style = {style}
                alt="" />
        </div>
    )

}

