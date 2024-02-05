export default UserView;

function UserView(user){
  console.log("props: \n")
  console.log(user?.name)
  return<>
    <h1>
      Hello, {user.name}
    </h1>
  </>
}