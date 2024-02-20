import {Link} from 'react-router-dom';
/**
 * 
 * @returns server error message
 */
export default function ErrorView(){
  return <><div>server error</div>
    <p>Already have an account? <Link to={"/login"}>Sign in</Link></p></>
}