import './Button.css';
function Button(props) {
    return (
        <div className="containerbutton">
            <button className="button" onClick={props.onClick}>
                {props.title}
            </button>
        </div>
    );
}

export default Button;
