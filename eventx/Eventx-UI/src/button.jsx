export default function Button({ onClick }) {
    const style = {
        borderRadius: "8px",
        border: "none",
        padding: "5px 10px",
        fontWeight: 500,
        fontFamily: "inherit",
        fontSize: "11px",
        backgroundColor: "#3c1055ff",
        cursor: "pointer",
        margin: "2px",
        color: "white",
        height:"40px"

    };
    return <button style={style} onClick={onClick}>click me</button>;
}
