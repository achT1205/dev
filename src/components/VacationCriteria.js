import React, { Component } from "react";
import {
    MDBRow,
    MDBCol,
    MDBSelect,
    MDBSelectInput,
    MDBSelectOptions,
    MDBSelectOption,
    MDBInput,
} from "mdbreact";
import { translate } from 'react-i18next';

class VacationCriteria extends Component {

    constructor(props) {
        super(props);
        this.state = {
            swimingPoolOptions: []
        };
    }

    componentDidMount() {
        const { t, criteria } = this.props;
        this.formatSwimingPoolOption(criteria.hasSwimingPool, t);
    }

    formatSwimingPoolOption(hasSwimingPool, t) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.swimingPoolOptions];
            prevOptions.push(
                {
                    checked: hasSwimingPool ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('edit.form.swimingPoolOptions.1')
                }
            );
            prevOptions.push(
                {
                    checked: !hasSwimingPool ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('edit.form.swimingPoolOptions.2')
                }
            );
            return { swimingPoolOptions: prevOptions };
        })
    }

    render() {
        const { t, handleCriteriaInputChange, handelHasSwimingPoolSelectChange, criteria } = this.props;
        return (
            <div>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBInput
                            label="Capacity"
                            name="numberOfPeople"
                            type="number"
                            value={criteria.numberOfPeople.toString()}
                            onChange={handleCriteriaInputChange} />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBSelect getValue={handelHasSwimingPoolSelectChange}
                            color="primary"
                            options={this.state.swimingPoolOptions}
                            selected="Choose your option"
                        />
                        <label>Swiming pool</label>
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBInput
                            name="numberOfVacationRooms"
                            label="number of rooms"
                            type="number"
                            value={criteria.numberOfVacationRooms.toString()}
                            onChange={handleCriteriaInputChange} />
                    </MDBCol>
                </MDBRow>
            </div>
        );

    }
}
export default translate('translations')(VacationCriteria);