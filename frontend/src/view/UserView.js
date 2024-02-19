export default UserView;
/**
 * 
 * @param {Object} props json user object with a name field.
 * @returns hello user html header.
 */
function UserView(props){
  return<>
    <h1>Hello, {props.user.name}</h1>
    <div>
      <p>This is your information. If something is not correct, please revise.</p>
      {props.user}
    </div>
    <p>Submit your application here</p>
  </>
}