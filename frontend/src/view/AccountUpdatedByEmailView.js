import {Link} from 'react-router-dom';

export default function AccountUpdatedByEmailView(){
  return <p>Return to login page to login <Link to={"/login"}>Sign in</Link></p>
}