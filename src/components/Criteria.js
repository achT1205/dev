import React from "react";
import VehiculeCriteria from './VehiculeCriteria';
import ImmovableCriteria from './ImmovableCriteria';
import VacationCriteria from './VacationCriteria';

const Criteria = (props) => {
    const {
        marks,
        selectedMark,
        handelMarksSelectChange,
        handleCriteriaInputChange,
        handelModelsSelectChange,
        handelYearsSelectChange,
        handelFuelsSelectChange,
        handelGearBoxSelectChange,
        handelImmovableTypesSelectChange,
        handelIsEquipedSelectChange,
        handelNumberOfRoomsSelectChange,
        handelEnergyClassificationSelectChange,
        handelGesSelectChange,
        handelHasSwimingPoolSelectChange,
        announcement } = props;
    return (
        <div>
            {announcement.category > 1 && announcement.category < 6 &&
                <VehiculeCriteria
                    handelYearsSelectChange={handelYearsSelectChange}
                    handelGearBoxSelectChange={handelGearBoxSelectChange}
                    handelFuelsSelectChange={handelFuelsSelectChange}
                    handelMarksSelectChange={handelMarksSelectChange}
                    category={announcement.category}
                    selectedMark={selectedMark}
                    criteria={announcement.criteria}
                    marks={marks}
                    handleCriteriaInputChange={handleCriteriaInputChange}
                    handelModelsSelectChange={handelModelsSelectChange}
                    yearLimit={50}
                    currentYear={2019}
                />
            }
            {announcement.category > 10 && announcement.category < 15 &&
                <ImmovableCriteria
                    handelImmovableTypesSelectChange={handelImmovableTypesSelectChange}
                    handelIsEquipedSelectChange={handelIsEquipedSelectChange}
                    handelNumberOfRoomsSelectChange={handelNumberOfRoomsSelectChange}
                    handelEnergyClassificationSelectChange={handelEnergyClassificationSelectChange}
                    handelGesSelectChange={handelGesSelectChange}
                    handleCriteriaInputChange={handleCriteriaInputChange}
                    category={announcement.category}
                    criteria={announcement.criteria}
                     />
            }
            {announcement.category > 14 && announcement.category < 19 &&
                <VacationCriteria
                    handleCriteriaInputChange={handleCriteriaInputChange}
                    criteria={announcement.criteria}
                    handelHasSwimingPoolSelectChange={handelHasSwimingPoolSelectChange}
                     />
            }
        </div>
    );

}
export default Criteria;