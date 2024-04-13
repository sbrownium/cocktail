import React from "react";

export default function Order ({checked, handleChange}) {
    // export default function Order ({handleAlpha, alphaCheck, handleDate, dateCheck }) {

    return (
        <form>
            <fieldset>
                <legend>Arrange drinks by:</legend>
                <label>
                <input
                    type="radio"
                    name="arrange"
                    value="Alphabetical"
                    // onChange={() => setChecked("Alphabetical")}
                    onChange={handleChange}
                    checked={(checked === "Alphabetical")}
                    />
                    Alphabetical
                </label>
                <label>
                <input
                    type="radio"
                    name="arrange"
                    value="Date Added"
                    // onChange={() => setChecked("Date Added")}
                    onChange={handleChange}
                    checked={(checked === "Date Added")}
                    />
                    Date Added
                </label>
            </fieldset>
        </form>
    )
}


