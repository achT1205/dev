import React, { Component } from "react";
import {
    MDBRow,
    MDBCol,
    MDBSelect,
    MDBInput,
} from "mdbreact";
import getCarMarksOptions from './carMarkOptions';
import { translate } from 'react-i18next';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as vehiculActions from "../../actions/vehiculActions";
import { compose } from "recompose";

const iconUrlBabe = "https://images.caradisiac.com/logos-ref/auto/auto--";
const defaultIconUrl = "https://static.caradisiac.com/img_site/mobileResponsive/logo_marqueDefault.gif";
const extension = ".png";

class QueryVehiculeCriteria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markOptions: [],
            modelOptions: [],
            yearOptions: [],
            fuelOptions: [],
            gearBoxOptions: [],
            marks: this.props.marks
        };
    }
    componentDidMount() {
        const { t,
            selectedMarks,
            selectedModel,
            criteria,
            yearLimit,
            currentYear
        } = this.props;
        let ops = getCarMarksOptions();
        this.setState({ markOptions: ops });
        this.formatMarkOptions(selectedMarks);
        // this.formatModelOptions(selectedMark, criteria.model, t);
        //  this.formatYearOfModel(yearLimit, currentYear, criteria.yearOfModel);
        //  this.formatFuels(criteria.typeOfFuel, t)
        // this.formatGearBoxOptions(criteria.typeOfGearBox, t);
    }

    componentWillUpdate(nextProps) {
        debugger;
        const { selectedMarks, t, selectedModels } = nextProps;
        
        if (selectedMarks !== this.props.selectedMarks) {
            let marks = this.state.marks.find(m => selectedMarks.includes(m.mark));
            if (marks) {
                this.setState({ modelOptions: [] });
                this.formatModelOptions(marks, selectedModels, t);
            }
        }
    }

    formatMarkOptions(selectedMarks) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.markOptions];
            prevOptions.forEach((op) => {
                if (selectedMarks && selectedMarks.length > 0 && selectedMarks.includes(op.value)) {
                    op.checked = true;
                }
            });
            return { markOptions: prevOptions };
        })
    }

    formatModelOptions(selectedMarks, selectedModels, t) {
        if (selectedMarks) {
            this.setState((prevState) => {
                let prevOptions = [...prevState.modelOptions];
                selectedMarks.forEach((mark)=>{
                    mark.models.forEach((model) => {
                        let option = {
                            checked: selectedModels.includes(model.model) ? true : false,
                            disabled: false,
                            icon: null,
                            value: model
                        };
                        prevOptions.push(option);
                    });
                });
                return { modelOptions: prevOptions };
            });
            //this.formatYearOfModel();
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
    /*
 
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
*/
    render() {
        const {
            t,
            categories,
            handelMarksSelectChange,
            handelModelsSelectChange,
            multiple,
            search,
            selectedMarks,
            handleCriteriaInputChange,
            handelYearsSelectChange,
            handelFuelsSelectChange,
            handelGearBoxSelectChange,
            criteria } = this.props;
        return (
            <div>
                {(categories.includes('2') || categories.includes('3')
                    || categories.includes('4') || categories.includes('5')) &&
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBSelect getValue={handelMarksSelectChange}
                                color="primary"
                                multiple={multiple}
                                search ={search}
                                options={this.state.markOptions}
                                selected={t('edit.form.labels.selectDefault')}
                            />
                            <label>{t('edit.form.labels.mark')}</label>
                        </MDBCol>
                        {
                            <MDBCol md="6">
                                <MDBSelect getValue={handelModelsSelectChange}
                                    color="primary"
                                    multiple={multiple}
                                    search ={search}
                                    options={this.state.modelOptions}
                                    selected={t('edit.form.labels.selectDefault')}
                                />
                                <label>{t('edit.form.labels.model')}</label>
                            </MDBCol>
                        }
                    </MDBRow>
                }

                {/*
                
                <MDBRow>
                    <MDBCol md="6">
                        <MDBSelect getValue={handelYearsSelectChange}
                            color="primary"
                            options={this.state.yearOptions}
                            selected={t('edit.form.labels.selectDefault')}
                        />
                        <label>{t('edit.form.labels.modelYear')}</label>
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBInput
                            label={t('edit.form.labels.mileage')}
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
                                    selected={t('edit.form.labels.selectDefault')}
                                />
                                <label>{t('edit.form.labels.fuel')} </label>
                            </MDBCol>
                        }
                        {category === 2 &&
                            <MDBCol md="6">
                                <MDBSelect getValue={handelGearBoxSelectChange}
                                    color="primary"
                                    options={this.state.gearBoxOptions}
                                    selected={t('edit.form.labels.selectDefault')}
                                />
                                <label>{t('edit.form.labels.gearBox')}</label>
                            </MDBCol>
                        }
                    </MDBRow>
                }
                {category === 3 &&
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBInput
                                label={t('edit.form.labels.cylinder')}
                                type="number"
                                name="cylinder"
                                value={criteria.cylinder.toString()}
                                onChange={handleCriteriaInputChange} />
                        </MDBCol>
                    </MDBRow>
                }
                */}
            </div>
        );

    }
}

function mapStateToProps(state, ownProps) {
    return {
        marks: state.marks,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, vehiculActions), dispatch)
    };
}

export default compose(
    translate('translations'),
    connect(mapStateToProps, mapDispatchToProps)
)(QueryVehiculeCriteria);