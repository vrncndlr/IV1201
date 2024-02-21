export default SummaryView;

function SummaryView({formData}) {

    return (
        <div>
            {/* Summary of the whole submission */}
            <h2>Your selected competence</h2>
            <p>{formData.competence.expertise}, {formData.competence.yearOfExperience} experience</p>
            <h2>Your selected availability</h2>
            <p>{formData.availability.start} - {formData.availability.end}</p>
            <p>If everything looks in order, feel free to submit</p>
            <button>Submit application</button>
        </div>
    )
}