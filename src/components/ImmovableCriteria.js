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

class ImmovableCriteria extends Component {

    constructor(props) {
        super(props);
        this.state = {
            immovableTypeOptions: [],
            isEquipedOptions: [],
            roomsNumberOptions: [],
            energyClassificationOptions: [],
            gesOptions: []
        };
    }
    componentDidMount() {
        const { t, criteria } = this.props;
        this.formatImmovableType(criteria.immovableType, t);
        this.formatIsEquipedOptions(criteria.isEquiped, t);
        this.formatRoomsNumberOptions(criteria.numberOfRooms)
        this.formatEnergyClassificationOptions(criteria.energyClassification);
        this.formatGesOptionsOptions(criteria.ges);
    }

    componentWillUpdate(nextProps, nextState) {
        const { t, criteria } = nextProps;
        if (nextProps.criteria.immovableType != this.props.criteria.immovableType) {
            this.setState({ immovableTypeOptions: [] });
            this.formatImmovableType(criteria.immovableType, t);
            this.setState({ isEquipedOptions: [] });
            this.setState({ roomsNumberOptions: [] });
            this.setState({ energyClassificationOptions: [] });
            this.setState({ gesOptions: [] });
            this.formatIsEquipedOptions(null, t);
            this.formatRoomsNumberOptions(null);
            this.formatEnergyClassificationOptions(null);
            this.formatGesOptionsOptions(null);
        }
    }

    formatImmovableType(type, t) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.immovableTypeOptions];
            prevOptions.push(
                {
                    checked: 1 === type ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('edit.form.immovableTypes.1')
                }
            );
            prevOptions.push(
                {
                    checked: 2 === type ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('edit.form.immovableTypes.2')
                }
            );
            return { immovableTypeOptions: prevOptions };
        })
    }

    formatIsEquipedOptions(isEquiped, t) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.isEquipedOptions];
            prevOptions.push(
                {
                    checked: isEquiped === true ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('edit.form.isEquiped.1')
                }
            );
            prevOptions.push(
                {
                    checked: isEquiped === false ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('edit.form.isEquiped.2')
                }
            );
            return { isEquipedOptions: prevOptions };
        })
    }

    formatRoomsNumberOptions(selected) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.roomsNumberOptions];

            for (let i = 1; i < 7; i++) {
                prevOptions.push(
                    {
                        checked: i === selected ? true : false,
                        disabled: false,
                        icon: null,
                        value: i.toString()
                    }
                );
            }
            return { roomsNumberOptions: prevOptions };
        })
    }

    formatEnergyClassificationOptions(selected) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.energyClassificationOptions];
            let list = ["A", "B", "C", "D", "E", "F", "G", "I"];

            list.forEach((w, index) => {
                prevOptions.push(
                    {
                        checked: index + 1 === selected ? true : false,
                        disabled: false,
                        icon: null,
                        value: w
                    }
                );
            }
            );
            return { energyClassificationOptions: prevOptions };
        })
    }

    formatGesOptionsOptions(selected) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.gesOptions];
            let list = ["A", "B", "C", "D", "E", "F", "G", "I"];

            list.forEach((w, index) => {
                prevOptions.push(
                    {
                        checked: index + 1 === selected ? true : false,
                        disabled: false,
                        icon: null,
                        value: w
                    }
                );
            }
            );
            return { gesOptions: prevOptions };
        })
    }

    render() {
        const { t,
            handleCriteriaInputChange,
            category,
            handelImmovableTypesSelectChange,
            handelIsEquipedSelectChange,
            handelNumberOfRoomsSelectChange,
            handelEnergyClassificationSelectChange,
            handelGesSelectChange ,
        criteria} = this.props;
        return (
            <div>
                {(category === 11 || category === 12) &&
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBSelect getValue={handelImmovableTypesSelectChange}
                                color="primary"
                                options={this.state.immovableTypeOptions}
                                selected="Choose your option"
                            />
                            <label>Type</label>
                        </MDBCol>
                        {category === 12 &&
                            <MDBCol md="6">
                                <MDBSelect getValue={handelIsEquipedSelectChange}
                                    color="primary"
                                    options={this.state.isEquipedOptions}
                                    selected="Choose your option"
                                />
                                <label>Equiped</label>
                            </MDBCol>
                        }
                    </MDBRow>
                }
                <MDBRow>
                    <MDBCol md="6">
                        <MDBInput
                            label="Size (m2)"
                            type="number"
                            step="0.01"
                            name="sizeOfSurface"
                            value={criteria.sizeOfSurface.toString()}
                            onChange={handleCriteriaInputChange} />
                    </MDBCol>
                    {category !== 14 &&
                        <MDBCol md="6">
                            <MDBSelect getValue={handelNumberOfRoomsSelectChange}
                                color="primary"
                                options={this.state.roomsNumberOptions}
                                selected="Choose your option"
                            />
                            <label>Rooms</label>
                        </MDBCol>
                    }
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBSelect getValue={handelEnergyClassificationSelectChange}
                            color="primary"
                            options={this.state.energyClassificationOptions}
                            selected="Choose your option"
                        />
                        <label>Energy classification</label>
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBSelect getValue={handelGesSelectChange}
                            color="primary"
                            options={this.state.gesOptions}
                            selected="Choose your option"
                        />
                        <label>GES</label>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }

}
export default translate('translations')(ImmovableCriteria);