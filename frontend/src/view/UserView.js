export default UserView;

function UserView(props){
  return<>
    <h1>
      Hello, {props.user.name}
    </h1>
  </>
}