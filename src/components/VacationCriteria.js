import React, { Component } from "react";
import {
    MDBRow,
    MDBCol,
    MDBSelect,
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

    componentWillReceiveProps(nextProps) {
        const { t, lng, criteria } = nextProps;
        if (lng !== this.props.lng) {
            this.formatSwimingPoolOption(criteria.hasSwimingPool, t);
        }
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
                            label={t('edit.form.labels.immovableCapacity')}
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
                            selected={t('edit.form.labels.selectDefault')}
                        />
                        <label>{t('edit.form.labels.swimingPool')}</label>
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBInput
                            name="numberOfVacationRooms"
                            label={t('edit.form.labels.numberOfVacationRooms')}
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