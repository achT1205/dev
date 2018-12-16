import React, { Component } from "react";
import QueryVehiculeCriteria from './QueryCarMarksSelect';

class QueryCriteria extends Component {

    render() {
        const {
            categories,
            selectedMarks,
            selectedModels,
            handelMarksSelectChange,
            handelModelsSelectChange,
            multiple,
            search
        } = this.props;
        return (
            <div>
                {categories.includes('2') &&
                    <QueryVehiculeCriteria
                        /*handelYearsSelectChange={handelYearsSelectChange}
                        handelGearBoxSelectChange={handelGearBoxSelectChange}
                        handelFuelsSelectChange={handelFuelsSelectChange}*/
                        selectedMarks={selectedMarks}
                        selectedModels={selectedModels}
                        handelMarksSelectChange={handelMarksSelectChange}
                        handelModelsSelectChange={handelModelsSelectChange}
                        categories={categories}
                        multiple={multiple}
                        search={search}
                    /*
                    criteria={announcement.criteria}
                    marks={marks}
                    handleCriteriaInputChange={handleCriteriaInputChange}
                    
                    yearLimit={50}
                    currentYear={2019}
                    lng={lng}*/
                    />
                }
            </div>
        );
    }

}
export default QueryCriteria;