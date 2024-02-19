import {Link} from 'react-router-dom';

export default function AccountUpdatedByEmailView(){
  return <p>Return to starting page to login <Link to={"/login"}>Login here</Link></p>
}