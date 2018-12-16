import React, { Component } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBSelect,
    MDBInput,
} from "mdbreact";
import { translate } from 'react-i18next';

class VehiculOtherFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yearOptions: [],
            fuelOptions: [],
            gearBoxOptions: []
        };
    }

    componentDidMount() {
        const {
            t,
            selectedYear,
            yearLimit,
            currentYear,
            selectedfuel } = this.props;
        this.formatYearOfModel(yearLimit, currentYear, selectedYear);
        this.formatFuels(selectedfuel, t);

    }

    formatYearOfModel(limit, currentYear, selectedYear) {
        if (limit && currentYear)
            this.setState((prevState) => {
                let prevOptions = [...prevState.yearOptions];
                for (let i = 0; i < limit + 1; i++) {
                    let option = {
                        checked: currentYear && currentYear - i === selectedYear ? true : false,
                        disabled: false,
                        icon: null,
                        value: (currentYear - i).toString()
                    };
                    prevOptions.push(option);
                };
                return { yearOptions: prevOptions };
            })
    }


    formatFuels(selectedfuel, t) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.fuelOptions];
            prevOptions.push(
                {
                    checked: 1 === selectedfuel ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('edit.form.fuels.1')
                }
            );
            prevOptions.push(
                {
                    checked: 2 === selectedfuel ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('edit.form.fuels.2')
                }
            );
            return { fuelOptions: prevOptions };
        })
    }

    render() {
        const { handelYearsSelectChange, handelFuelsSelectChange, multiple, search, hideLabe, t } = this.props;
        return (
            <div>
                <MDBRow>
                    <MDBSelect getValue={handelYearsSelectChange}
                        color="primary"
                        multiple={multiple}
                        search={search}
                        options={this.state.yearOptions}
                        selected={t('edit.form.labels.selectDefault')}
                    />
                    {!hideLabe && <label>{t('edit.form.labels.modelYear')}</label>}
                </MDBRow>
                <MDBRow>
                    <MDBSelect getValue={handelFuelsSelectChange}
                        color="primary"
                        multiple={multiple}
                        options={this.state.fuelOptions}
                        selected={t('edit.form.labels.selectDefault')}
                    />
                     {!hideLabe && <label>{t('edit.form.labels.fuel')}</label>}
                </MDBRow>

            </div>
        )
    }

}
export default translate('translations')(VehiculOtherFilters);
