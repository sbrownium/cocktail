import React from "react";
import Input from "./Input";

export default function Filter ({
    filterChecked,
    handleFilterChange
    }) {
    return (
        <form>
            <fieldset>
                <legend>Filter by:</legend>
                <Input
                    inputName='arrange'
                    type='checkbox'
                    value='Only Top Rated'
                    handleChange={handleFilterChange}
                    checked={filterChecked.topRated}
                />
                <Input
                    inputName='arrange'
                    type='checkbox'
                    value='With Comments'
                    handleChange={handleFilterChange}
                    checked={filterChecked.withComments}
                />
            </fieldset>
        </form>
    )
}