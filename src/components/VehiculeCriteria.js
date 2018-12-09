import React, { Component } from "react";
import {
    MDBRow,
    MDBCol,
    MDBSelect,
    MDBInput,
} from "mdbreact";
import { translate } from 'react-i18next';
const iconUrlBabe = "https://images.caradisiac.com/logos-ref/auto/auto--";
const defaultIconUrl = "https://static.caradisiac.com/img_site/mobileResponsive/logo_marqueDefault.gif";
const extension = ".png";
class VehiculeCriteria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markOptions: [],
            modelOptions: [],
            yearOptions: [],
            fuelOptions: [],
            gearBoxOptions: []
        };
    }


    componentDidMount() {
        const { t,
            selectedMark,
            marks,
            criteria,
            yearLimit,
            currentYear } = this.props;
        this.formatMarkOptions(selectedMark, marks);
        this.formatModelOptions(selectedMark, criteria.model, t);
        this.formatYearOfModel(yearLimit, currentYear, criteria.yearOfModel);
        this.formatFuels(criteria.typeOfFuel, t)
        this.formatGearBoxOptions(criteria.typeOfGearBox, t);
    }

    componentWillReceiveProps(nextProps) {
        const { selectedMark,
            t,
            yearLimit,
            currentYear,
            criteria
        } = nextProps;
        if (selectedMark && selectedMark.id !== this.props.selectedMark.id) {
           
            this.setState((prevState) => {
                let prevOptions = [...prevState.markOptions];
                let index = this.state.markOptions.findIndex(op => op.value === selectedMark.mark);
                if (prevOptions[index])
                    prevOptions[index].checked = true;
                return { markOptions: prevOptions };
            });
            this.setState({ modelOptions: [] });
            this.setState({ yearOptions: [] });
            this.setState({ fuelOptions: [] });
            this.setState({ gearBoxOptions: [] });
            this.formatModelOptions(nextProps.selectedMark, null, t);
            this.formatYearOfModel(yearLimit, currentYear, criteria.yearOfModel);
            this.formatFuels(criteria.typeOfFuel, t)
            this.formatGearBoxOptions(criteria.typeOfGearBox, t);
        }
        else {
            this.setState((prevState) => {
                let prevOptions = [...prevState.modelOptions];
                let index = this.state.modelOptions.findIndex(op => op === criteria.model);
                if (prevOptions[index])
                    prevOptions[index].checked = true;
                return { modelOptions: prevOptions };
            });
            this.setState((prevState) => {
                let prevOptions = [...prevState.yearOptions];
                let index = this.state.yearOptions.findIndex(y => y === criteria.yearOfModel);
                if (prevOptions[index])
                    prevOptions[index].checked = true;
                return { yearOptions: prevOptions };
            });
        }
    }

    formatMarkOptions(selectedMark, marks) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.markOptions];
            marks.forEach((mark) => {
                let option = {
                    checked: selectedMark && selectedMark.mark === mark.mark ? true : false,
                    disabled: false,
                    icon: !mark.shortName ? defaultIconUrl : iconUrlBabe + mark.shortName + extension,
                    value: mark.mark
                };
                prevOptions.push(option);

            });
            return { markOptions: prevOptions };
        })
    }

    formatModelOptions(selectedMark, selectedModel, t) {
        if (selectedMark && selectedMark.id) {
            this.setState((prevState) => {
                let prevOptions = [...prevState.modelOptions];
                selectedMark.models.forEach((model) => {
                    let option = {
                        checked: selectedModel && selectedModel === model ? true : false,
                        disabled: false,
                        icon: null,
                        value: model
                    };
                    prevOptions.push(option);

                });
                return { modelOptions: prevOptions };
            });
            this.formatYearOfModel();
        } else {
            this.setState({
                modelOptions: [{
                    checked: true,
                    disabled: false,
                    icon: null,
                    value: t('edit.form.category.selected')
                }]
            });
        }
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

    formatGearBoxOptions(selectedGearBox, t) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.gearBoxOptions];
            prevOptions.push(
                {
                    checked: 1 === selectedGearBox ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('edit.form.gearBox.1')
                }
            );
            prevOptions.push(
                {
                    checked: 2 === selectedGearBox ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('edit.form.gearBox.2')
                }
            );
            return { gearBoxOptions: prevOptions };
        })
    }

    render() {
        const {
            t,
            category,
            handelMarksSelectChange,
            handelModelsSelectChange,
            handleCriteriaInputChange,
            handelYearsSelectChange,
            handelFuelsSelectChange,
            handelGearBoxSelectChange,
            criteria } = this.props;
        return (
            <div>
                {category === 2 &&
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBSelect getValue={handelMarksSelectChange}
                                color="primary"
                                options={this.state.markOptions}
                                selected="Choose your option"
                            />
                            <label>Marque</label>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBSelect getValue={handelModelsSelectChange}
                                color="primary"
                                options={this.state.modelOptions}
                                selected="Choose your option"
                            />
                            <label>Model</label>
                        </MDBCol>
                    </MDBRow>
                }

                <MDBRow>
                    <MDBCol md="6">
                        <MDBSelect getValue={handelYearsSelectChange}
                            color="primary"
                            options={this.state.yearOptions}
                            selected="Choose your option"
                        />
                        <label>Model's year</label>
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBInput
                            label="Mileage (Km)"
                            type="number"
                            step="0.01"
                            name="mileage"
                            onBlur={handleCriteriaInputChange} />
                    </MDBCol>
                </MDBRow>
                {(category === 2 || category === 5) &&
                    <MDBRow>
                        {(category === 2 || category === 5) &&
                            <MDBCol md="6">
                                <MDBSelect getValue={handelFuelsSelectChange}
                                    color="primary"
                                    options={this.state.fuelOptions}
                                    selected="Choose your option"
                                />
                                <label>Fuel</label>
                            </MDBCol>
                        }
                        {category === 2 &&
                            <MDBCol md="6">
                                <MDBSelect getValue={handelGearBoxSelectChange}
                                    color="primary"
                                    options={this.state.gearBoxOptions}
                                    selected="Choose your option"
                                />
                                <label>Gear box</label>
                            </MDBCol>
                        }
                    </MDBRow>
                }
                {category === 3 &&
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBInput
                                label="Cylinder (cm3)"
                                type="number"
                                name="cylinder"
                                value={criteria.cylinder.toString()}
                                onChange={handleCriteriaInputChange} />
                        </MDBCol>
                    </MDBRow>
                }
            </div>
        );

    }
}
export default translate('translations')(VehiculeCriteria);