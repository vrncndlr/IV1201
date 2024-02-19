export default AvailabilityView;

function AvailabilityView(props) {
    return (
        <div className={"mainContainer"}>
            <div className={"inputContainer"}>
                <div className={"inputGroup"}>
                    <input placeholder="Start date yy-mm-dd"/>,
                    <input placeholder="End date yy-mm-dd"/>
                </div>
            </div>
        </div>
    )
}