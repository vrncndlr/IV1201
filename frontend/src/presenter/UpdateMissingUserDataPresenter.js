import SendRestoreUserdataEmailView from "../view/SendRestoreUserdataEmailView"
import RestoreAccountDataView from "../view/RestoreAccountDataView"
import AccountUpdatedByEmailView from "../view/AccountUpdatedByEmailView"
import {useState} from "react";
import {restoreAccountByEmail, updateAccountByEmailCode} from '../integration/DBCaller'

export default function MissingUserDataUpdate(props){
  const [restoreEmailSent, setRestoreEmailSent] = useState(false);
  const [accountUpdated, setAccountUpdated] = useState(false);

  async function updateAccountByEmailCode(formData){
    console.log(formData)
    const result = await updateAccountByEmailCode(formData);
    setRestoreEmailSent(false);
    setAccountUpdated(true);
  }

  async function sendResetEmail(email){
    console.log("jsoning email")
    console.log(JSON.stringify(email))
    const result = await restoreAccountByEmail(email)
    console.log("app.js")
    console.log(result.emailSent)
    if(result.emailSent)
      setRestoreEmailSent(true);
  }

  return <>
      <div>{!restoreEmailSent && !accountUpdated &&
        <SendRestoreUserdataEmailView sendResetEmail = {sendResetEmail}/>}</div>
      <div>{restoreEmailSent && !accountUpdated &&
        <RestoreAccountDataView updateAccountByEmailCode = {updateAccountByEmailCode}/>}</div>
      <div>{accountUpdated && <AccountUpdatedByEmailView />}</div>
    </>
}