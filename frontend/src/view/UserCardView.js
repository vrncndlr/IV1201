export default UserCardView;

function UserCardView(props) {

    return (
        <div>
            <h2>Hello, {props.user.name}</h2>
        </div>
    )
}