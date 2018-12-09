import React, { Component } from 'react';
import * as vehiculActions from "../actions/vehiculActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as announcementsActions from "../actions/announcementsActions";
import { compose } from "recompose";
import defaultAnnouncement from './announcement';
import { MDBContainer, MDBRow, MDBCol, Card, CardBody, MDBInput, Input, MDBFileInput, MDBBtn, CardTitle, toast, ToastContainer } from "mdbreact";

import SelectInput from './common/SelectInput';
import TextImput from './common/TextImput';
import Criteria from './Criteria';
import { translate } from 'react-i18next';
import createHistory from 'history/createBrowserHistory';
import categoryArray from '../api/categories';
const history = createHistory({ forceRefresh: true })

const handleClick = (id) => {
    history.push(`/summary/${id}`);
};

class EditFrom extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            marks: Object.assign({}, this.props.marks),
            announcement: Object.assign({}, this.props.announcement),
            errors: {},
            saving: false,
            profileRadio: 0,
            genderRadio: 0,
            typeRadio: 0,
            category: 0,
            errors: {},
            title: "",
            criteria: Object.assign({}, {}),
            selectedMark: this.props.announcement.criteria && this.props.announcement.criteria.mark ?
                Object.assign({}, this.props.marks.find(m => m.mark === this.props.criteria.mark)[0]) :
                Object.assign({}, {}),
        };
        //this.updateAnnouncementState = this.updateAnnouncementState.bind(this);
        //this.saveAnnouncement = this.saveAnnouncement.bind(this);
    }

    onClickProfileRadio = (nr) => {
        this.setState({
            profileRadio: nr
        });
        let announcement = this.state.announcement;
        announcement.owner.typeOfProfile = nr;
        this.setState({ announcement: Object.assign({}, announcement) });
    }
    onClickGenderRadio = (nr) => {
        this.setState({
            genderRadio: nr
        });
        let announcement = this.state.announcement;
        announcement.owner.gender = nr;
        this.setState({ announcement: Object.assign({}, announcement) });
    }
    onClickMarketingCheck = () => {
        let announcement = this.state.announcement;
        announcement.owner.toBeContactedForMarketing = !announcement.owner.toBeContactedForMarketing;
        this.setState({ announcement: Object.assign({}, announcement) });
    }

    onClickHidePhoneCheck = () => {
        let announcement = this.state.announcement;
        announcement.owner.hidePhone = !announcement.owner.hidePhone;
        this.setState({ announcement: Object.assign({}, announcement) });
    }

    onClickTypeRadio = (nr) => {
        this.setState({
            typeRadio: nr
        });
        let announcement = this.state.announcement;
        if (nr === 1) { announcement.type = "Offer" }
        else {
            announcement.type = "Demande"
        }
        this.setState({ announcement: Object.assign({}, announcement) });
    }

    handleTitleInputChange = (value) => {
        let announcement = this.state.announcement;
        announcement.title = value;
        this.setState({ announcement: Object.assign({}, announcement) });
    }

    fileInputHandler = (value) => {
    }

    getCategoryId(value) {
        let categories = categoryArray.filter(category => category.label === value);
        return categories[0].id ? parseInt(categories[0].id) : 0;
    }

    handelCategorySelectChange = (value) => {
        let announcement = this.state.announcement;
        if (value.length === 1 && announcement.category != this.getCategoryId(value[0])) {
            announcement.category = this.getCategoryId(value[0]);
            this.setState({ criteria: Object.assign({}, {}) });
            this.setState({ selectedMark: Object.assign({}, {}) });
            this.setState({ announcement: announcement });
        }
    }

    handelMarksSelectChange = (value) => {
        let announcement = this.state.announcement;
        if (value[0] && value[0].length > 0 && this.props.marks) {
            const { marks } = this.props;
            let selectedMark = marks.find(m => m.mark === value[0]);
            announcement.criteria.mark = selectedMark.mark;
            this.setState({ selectedMark: Object.assign({}, selectedMark) });
            this.setState({ announcement: Object.assign({}, announcement) });
        }
    }

    handelModelsSelectChange = (value) => {
        let announcement = this.state.announcement;
        if (value[0] && value[0].length > 0 && announcement.criteria.model != value[0]) {
            announcement.criteria.model = value[0];
            this.setState({ announcement: Object.assign({}, announcement) });
        }
    }

    handelYearsSelectChange = (value) => {
        let announcement = this.state.announcement;
        if (value[0] && value[0].length > 0 && announcement.criteria.yearOfModel !== parseInt(value[0])) {
            announcement.criteria.yearOfModel = parseInt(value[0]);
            this.setState({ announcement: Object.assign({}, announcement) });
        }
    }

    handelGearBoxSelectChange = (value) => {
        let announcement = this.state.announcement;
        if (value[0] && value[0].length > 0 && announcement.criteria.typeOfGearBox !== this.getGearBoxId(value[0])) {
            announcement.criteria.typeOfGearBox = this.getGearBoxId(value[0]);
            this.setState({ announcement: Object.assign({}, announcement) });
        }
    }

    handelHasSwimingPoolSelectChange = (value) => {
        let announcement = this.state.announcement;
        if (announcement.criteria.hasSwimingPool !== this.swimingPoolOptionId(value[0])) {
            announcement.criteria.hasSwimingPool = this.swimingPoolOptionId(value[0]);
            this.setState({ announcement: Object.assign({}, announcement) });
        }
    }

    swimingPoolOptionId(label) {
        if (label === "Yes" || label === "Oui") {
            return true;
        };
        if (label === "No" || label === "Non") {
            return false;
        };
    }

    handelFuelsSelectChange = (value) => {
        let announcement = this.state.announcement;
        if (value[0] && value[0].length > 0 && announcement.criteria.typeOfFuel !== this.getFuelId(value[0])) {
            announcement.criteria.typeOfFuel = this.getFuelId(value[0]);
            this.setState({ announcement: Object.assign({}, announcement) });
        }
    }


    getGearBoxId(label) {
        if (label === "Manual") {
            return 1;
        };
        if (label === "Automatique") {
            return 2;
        };
    }

    getFuelId(label) {
        if (label === "Diesel") {
            return 1;
        };
        if (label === "Electrical" || label === "Electrique") {
            return 2;
        };
    }

    handelNumberOfRoomsSelectChange = (value) => {
        let announcement = this.state.announcement;
        if (announcement.criteria.numberOfRooms !== parseInt(value[0])) {
            announcement.criteria.numberOfRooms = parseInt(value[0]);
            this.setState({ announcement: Object.assign({}, announcement) });
        }
    }

    handelEnergyClassificationSelectChange = (value) => {
        let announcement = this.state.announcement;
        if (announcement.criteria.energyClassification !== this.getEnergyClassificationId(value[0])) {
            announcement.criteria.energyClassification = this.getEnergyClassificationId(value[0]);
            this.setState({ announcement: Object.assign({}, announcement) });
        }
    }

    getEnergyClassificationId(w) {
        let list = ["A", "B", "C", "D", "E", "F", "G", "I"];
        return list.findIndex(w => w === w) + 1;
    }


    handelGesSelectChange = (value) => {
        let announcement = this.state.announcement;
        if (announcement.criteria.ges !== this.getGesId(value[0])) {
            announcement.criteria.ges = this.getGesId(value[0]);
            this.setState({ announcement: Object.assign({}, announcement) });
        }
    }

    getGesId(w) {
        let list = ["A", "B", "C", "D", "E", "F", "G", "I"];
        return list.findIndex(w => w === w) + 1;
    }


    handelIsEquipedSelectChange = (value) => {
        let announcement = this.state.announcement;
        if (value[0] && value[0].length > 0 && announcement.criteria.isEquiped !== this.isEquiped(value[0])) {
            announcement.criteria.isEquiped = this.isEquiped(value[0]);
            this.setState({ announcement: Object.assign({}, announcement) });
        }
    }
    isEquiped(label) {
        if (label === "Equiped") {
            return true;
        };
        if (label === "Non Equiped") {
            return false;
        };
    }
    getImmovableTypeId(label) {
        if (label === "House" || label === "Maison") {
            return 1;
        };
        if (label === "Appartment" || label === "Appartement") {
            return 2;
        };
    }

    handelImmovableTypesSelectChange = (value) => {
        let announcement = this.state.announcement;
        if (value[0] && value[0].length > 0 && announcement.criteria.immovableType !== this.getImmovableTypeId(value[0])) {
            announcement.criteria.immovableType = this.getImmovableTypeId(value[0]);
            this.setState({ announcement: Object.assign({}, announcement) });
        }
    }

    handleInputChange = (event) => {
        const field = event.target.name;
        let announcement = this.state.announcement;
        if (field === "title" && event.target.value.length > 15) {
            announcement[field] = event.target.value.substring(0, 15);
        }
        announcement[field] = event.target.value;
        this.setState({ announcement: Object.assign({}, announcement) });
    }

    handleOwnerInputChange = (event) => {
        const field = event.target.name;
        let announcement = this.state.announcement;
        announcement.owner[field] = event.target.value;
        this.setState({ announcement: Object.assign({}, announcement) });
    }
    handleLocationInputChange = (event) => {
        const field = event.target.name;
        let announcement = this.state.announcement;
        announcement.location[field] = event.target.value;
        this.setState({ announcement: Object.assign({}, announcement) });
    }

    handleDescriptionInputChange = (event) => {
        let announcement = this.state.announcement;
        let field = event.target.name;
        announcement[field] = event.target.value;
        announcement.shortDescription =  event.target.value.substring(0, 80) + " ..."
        this.setState({ announcement: Object.assign({}, announcement) });
    }

    handleCriteriaInputChange = (event) => {
        const field = event.target.name;
        let announcement = this.state.announcement;
        announcement.criteria[field] = event.target.value;
        this.setState({ announcement: Object.assign({}, announcement) });
        console.log(this.state.announcement);
    }

    AnnouncementFromISValid() {
        let formIsValid = true;
        let errors = {};

        if (!this.state.announcement.title || this.state.announcement.title.length < 5) {
            errors.title = "Title must be at least 5 characters.";
            formIsValid = false;
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    redirect() {
        this.setState({ saving: false });
        toast.success("Success :)", {
            position: "top-right",
            autoClose: 5000,
            closeButton: true,
        });
        // handleClick(this.state.announcement.id);
        // this.context.router.push("/courses");
    }

    onSave = (event) => {
        event.preventDefault();
        if (!this.AnnouncementFromISValid()) {
            toast.error("You must fell all teh required fields :(", {
                position: "top-right",
                autoClose: 5000,
                closeButton: true,
            });

            return;
        }
        this.setState({ saving: true });
        this.props.actions
            .saveAnnouncement(this.state.announcement)
            .then(this.redirect())
            .catch(error => {
                this.setState({ saving: false });
            });

        console.log(this.state.announcement);
        this.setState({ saving: false });
    }

    componentWillMount() {
        if (this.props.announcementId)
            this.props.actions
                .loadAnnouncement(this.props.announcementId)
                .then(() => { });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ announcement: Object.assign({}, nextProps.announcement) });
        if (nextProps.announcement.id) {
            this.setState({ criteria: nextProps.announcement.criteria });
            if (nextProps.announcement.criteria.mark)
                this.setState({ selectedMark: this.props.marks.find(m => m.mark === nextProps.announcement.criteria.mark) });

        }
        if (nextProps.announcement.owner.gender) {
            this.setState({
                genderRadio: nextProps.announcement.owner.gender
            });
        }
        if (nextProps.announcement.type) {
            this.setState({
                typeRadio: nextProps.announcement.type
            });
        }
        if (nextProps.announcement.owner.typeOfProfile) {
            this.setState({
                profileRadio: nextProps.announcement.owner.typeOfProfile
            });
        }
    }

    render() {
        const { t, marks } = this.props;

        return (
            <div>
                <Card wide>
                    <CardBody cascade>
                        <CardTitle>Announcement</CardTitle>
                        <form>
                            <MDBContainer>
                                <MDBRow>
                                    <MDBCol md="6">
                                        <SelectInput
                                            handelCategorySelectChange={this.handelCategorySelectChange}
                                            selectedValue={this.state.announcement.category.toString()}
                                        />
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <TextImput
                                            type="text"
                                            category={this.state.announcement.category}
                                            value={this.state.announcement.title}
                                            handleInputChange={this.handleInputChange}
                                            name="title"
                                            maxLength="4" />
                                    </MDBCol>
                                </MDBRow>
                                <Criteria
                                    marks={marks}
                                    announcement={this.state.announcement}
                                    handelMarksSelectChange={this.handelMarksSelectChange}
                                    handleCriteriaInputChange={this.handleCriteriaInputChange}
                                    handelModelsSelectChange={this.handelModelsSelectChange}
                                    selectedMark={this.state.selectedMark}
                                    handelYearsSelectChange={this.handelYearsSelectChange}
                                    handelGearBoxSelectChange={this.handelGearBoxSelectChange}
                                    handelFuelsSelectChange={this.handelFuelsSelectChange}
                                    handelImmovableTypesSelectChange={this.handelImmovableTypesSelectChange}
                                    handelIsEquipedSelectChange={this.handelIsEquipedSelectChange}
                                    handelGesSelectChange={this.handelGesSelectChange}
                                    handelNumberOfRoomsSelectChange={this.handelNumberOfRoomsSelectChange}
                                    handelEnergyClassificationSelectChange={this.handelEnergyClassificationSelectChange}
                                    handelHasSwimingPoolSelectChange={this.handelHasSwimingPoolSelectChange}
                                />
                                <MDBRow>
                                    <MDBCol md="12">
                                        <h6>{t('edit.form.profile.title')}</h6>
                                    </MDBCol>
                                    <MDBCol md="12">
                                        <div className="form-inline">
                                            <Input
                                                onClick={() => this.onClickProfileRadio(1)}
                                                checked={this.state.profileRadio === 1 ? true : false}
                                                label={t('edit.form.profile.radio.particular')}
                                                type="radio"
                                                id="profile1"
                                            />
                                            <Input
                                                onClick={() => this.onClickProfileRadio(2)}
                                                checked={this.state.profileRadio === 2 ? true : false}
                                                label={t('edit.form.profile.radio.professional')}
                                                type="radio"
                                                id="profile2"
                                            />
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <h6>{t('edit.form.type.title')}</h6>
                                    </MDBCol>
                                    <MDBCol md="12">
                                        <div className="form-inline">
                                            <Input
                                                onClick={() => this.onClickTypeRadio(1)}
                                                checked={this.state.typeRadio === 1 ? true : false}
                                                label={t('edit.form.type.radio.offers')}
                                                type="radio"
                                                id="type1"
                                            />
                                            <Input
                                                onClick={() => this.onClickTypeRadio(2)}
                                                checked={this.state.typeRadio === 2 ? true : false}
                                                label={t('edit.form.type.radio.demandes')}
                                                type="radio"
                                                id="type2"
                                            />
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <MDBInput label={t('edit.form.amount.label')}
                                            type="text"
                                            name="amount"
                                            type="number"
                                            value={this.state.announcement.amount.toString()}
                                            onChange={this.handleInputChange}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <MDBInput
                                            type="textarea"
                                            label={t('edit.form.description.label')}
                                            name="description"
                                            value={this.state.announcement.description}
                                            rows="3"
                                            onChange={this.handleDescriptionInputChange} />
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </form>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBFileInput multiple getValue={this.fileInputHandler} />
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </CardBody>
                </Card>
                <Card wide style={{ marginTop: 30 }}>
                    <CardBody cascade>
                        <CardTitle>Location</CardTitle>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="6">
                                    <MDBInput
                                        type="text"
                                        label="City"
                                        value={this.state.announcement.location.city}
                                        onChange={this.handleLocationInputChange}
                                        name="city" />
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBInput
                                        type="number"
                                        label="Zipcode"
                                        value={this.state.announcement.location.zipCode.toString()}
                                        onChange={this.handleLocationInputChange}
                                        name="zipCode" />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="3">
                                    <MDBInput
                                        type="number"
                                        label="Street number"
                                        value={this.state.announcement.location.numberOfStreet.toString()}
                                        onChange={this.handleLocationInputChange}
                                        name="numberOfStreet" />
                                </MDBCol>
                                <MDBCol md="9">
                                    <MDBInput
                                        type="text"
                                        label="Name of the street"
                                        value={this.state.announcement.location.streetName}
                                        onChange={this.handleLocationInputChange}
                                        name="streetName" />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <MDBCol md="12">
                                        <MDBInput
                                            type="text"
                                            label="Address"
                                            value={this.state.announcement.location.address}
                                            onChange={this.handleLocationInputChange}
                                            name="address" />
                                    </MDBCol>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBInput
                                        type="text"
                                        label="Place known as"
                                        value={this.state.announcement.location.placeKnownAs}
                                        onChange={this.handleLocationInputChange}
                                        name="placeKnownAs" />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBInput
                                        type="text"
                                        label="Country"
                                        value={this.state.announcement.location.country}
                                        onChange={this.handleLocationInputChange}
                                        name="country" />
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </CardBody>
                </Card>
                <Card wide style={{ marginTop: 30 }}>
                    <CardBody cascade>
                        <CardTitle>Owner informations</CardTitle>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="12">
                                    <h6>Gender</h6>
                                </MDBCol>
                                <MDBCol md="12">
                                    <div className="form-inline">
                                        <Input
                                            onClick={() => this.onClickGenderRadio(1)}
                                            checked={this.state.genderRadio === 1 ? true : false}
                                            label="M"
                                            type="radio"
                                            id="gender1"
                                        />
                                        <Input
                                            onClick={() => this.onClickGenderRadio(2)}
                                            checked={this.state.genderRadio === 2 ? true : false}
                                            label="F"
                                            type="radio"
                                            id="gender2"
                                        />
                                        <Input
                                            onClick={() => this.onClickGenderRadio(3)}
                                            checked={this.state.genderRadio === 3 ? true : false}
                                            label="Don't want to mentionne it"
                                            type="radio"
                                            id="gender3"
                                        />
                                    </div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="6">
                                    <MDBInput
                                        type="text"
                                        label="User name"
                                        value={this.state.announcement.owner.name}
                                        onChange={this.handleOwnerInputChange}
                                        name="name" />
                                </MDBCol>
                                <MDBCol md="6">
                                    <MDBInput
                                        type="text"
                                        label="Phone"
                                        value={this.state.announcement.owner.phone.toString()}
                                        onChange={this.handleOwnerInputChange}
                                        name="phone" />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12">
                                    <MDBInput
                                        type="email"
                                        label="Email"
                                        value={this.state.announcement.owner.email}
                                        onChange={this.handleOwnerInputChange}
                                        name="email" />
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="6">
                                    <Input
                                        label="Don't show my phone"
                                        type="checkbox"
                                        id="hidePhone"
                                        name="hidePhone"
                                        checked={this.state.announcement.owner.hidePhone}
                                        onClick={() => this.onClickHidePhoneCheck()} />
                                </MDBCol>
                                <MDBCol md="6">
                                    <Input
                                        label="Not to be contacted for marketing"
                                        type="checkbox"
                                        id="toBeContactedForMarketing"
                                        name="toBeContactedForMarketing"
                                        checked={this.state.announcement.owner.toBeContactedForMarketing}
                                        onClick={() => this.onClickMarketingCheck()} />
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </CardBody>
                </Card>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    closeButton={false}
                    newestOnTop={false}
                    rtl={false}>
                </ToastContainer>
                <div className="text-center">
                    <MDBBtn
                        color="primary"
                        disabled={this.state.saving}
                        onClick={this.onSave}
                    >{this.state.saving ? "Saving..." : "Save"}</MDBBtn>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let announcement = {};
    if (state.announcements && state.announcements.length === 1 && state.announcements[0].id) {
        announcement = state.announcements[0];
    } else {
        announcement = defaultAnnouncement;
    }
    let announcementId = ownProps.announcementId ? ownProps.announcementId : "";
    return {
        marks: state.marks,
        announcement: announcement,
        announcementId: announcementId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, vehiculActions, announcementsActions), dispatch)
    };
}

export default compose(
    translate('translations'),
    connect(mapStateToProps, mapDispatchToProps)
)(EditFrom);