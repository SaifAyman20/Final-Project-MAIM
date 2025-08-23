import Button from "./button";
export default function Container() {
    const style = {
        border: "2px solid var(--primecolor)",
        borderRadius: "8px",
        padding: "10px 10px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    };
    return <div style={style}>
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
    </div>;
}
