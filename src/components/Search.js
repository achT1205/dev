import React, { Component } from "react";
import { FormInline, Fa, MDBCol, Card, CardBody, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBSelect, Badge, Input } from "mdbreact";
import QueryCategoriesSelect from '../components/common/QueryCategoriesSelect';
import categoryArray from '../api/categories';
import QueryCarMarksSelect from './common/QueryCarMarksSelect';
import QueryCarModelSelect from './common/QueryCarModelSelect';
import './Search.css'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCar: false,
            categories: ["0"],
            marks: [],
            models: [],
            offer: false,
            demande: false,
            typeOptions: [
                {
                    checked: false,
                    disabled: false,
                    icon: null,
                    value: "Offer"
                },
                {
                    checked: false,
                    disabled: false,
                    icon: null,
                    value: "Demande"
                }
            ]
        };
    }

    onClickOfferType = () => {
        let val = this.state.offer;
        this.setState({ offer: !val });
    }
    onClickDemandeType = () => {
        let val = this.state.demande;
        this.setState({ demande: !val });
    }

    getCategoryId(value) {
        let categories = categoryArray.filter(category => category.label === value);
        return categories[0].id ? parseInt(categories[0].id) : 0;
    }

    handelCategorySelectChange = (values) => {
        this.setState((prevState) => {
            let categories = [];
            values.forEach((value) => {
                let id = this.getCategoryId(value);
                categories.push(id.toString());    
            });
            return { categories: categories }
        });
    }

    handelMarksSelectChange = (values) => {
        let marks = [];
        if (values && values.length > 0) {
            values.forEach((value) => {
                marks.push(value);
            });
            this.setState({ marks: marks });
            this.setState({ models: [] });
        }
    }

    handelModelsSelectChange = (values) => {
        let models = [];
        if (values && values.length > 0) {
            values.forEach((value) => {
                models.push(value);
            });
            this.setState({ models: models });
        }
    }

    render() {
        const { t, marks, lng } = this.props;
        return (
            <div style={{ marginTop: 20 }}>
                <Card>
                    <CardBody>
                        <FormInline className="md-form">
                            <Fa className="search" icon="search" />
                            <input className="form-control form-control-sm ml-3 w-100" type="text" placeholder="Search" aria-label="Search" />
                        </FormInline>
                        <FormInline>
                            <MDBDropdown>
                                <MDBCol md="2">
                                    <MDBDropdownToggle color="primary">
                                        Type
                                    </MDBDropdownToggle>
                                </MDBCol>
                                <MDBDropdownMenu basic>
                                    <div style={{ width: 500, height: 200 }}>
                                        <MDBCol md="10">
                                            <FormInline>
                                                <Input
                                                    label="Offer"
                                                    checked
                                                    type="checkbox"
                                                    id="checkbox2"
                                                    onClick={() => this.onClickOfferType()}
                                                    checked={this.state.offer} />

                                                <Input
                                                    label="Demande"
                                                    checked
                                                    type="checkbox"
                                                    id="checkbox3"
                                                    onClick={() => this.onClickDemandeType()}
                                                    checked={this.state.demande} />
                                            </FormInline>
                                        </MDBCol>
                                    </div>
                                    <Badge className="float-left" tag="a" href="#!" color="secondary">Clean</Badge>
                                    <Badge className="float-right" tag="a" href="#!" color="primary">Apply</Badge>
                                </MDBDropdownMenu>
                            </MDBDropdown>

                            <MDBDropdown>
                                <MDBCol md="2">
                                    <MDBDropdownToggle color="primary">
                                        Category
                                    </MDBDropdownToggle>
                                </MDBCol>
                                <MDBDropdownMenu basic>
                                    <div style={{ width: 500, height: 200 }}>
                                        <MDBCol md="10">
                                            <QueryCategoriesSelect
                                                multiple={true}
                                                search={true}
                                                hideLabe={true}
                                                handelCategorySelectChange={this.handelCategorySelectChange}
                                                selectedValues={this.state.categories}
                                                lng={lng}
                                            />
                                        </MDBCol>
                                    </div>
                                    <Badge className="float-left" tag="a" href="#!" color="secondary">Clean</Badge>
                                    <Badge className="float-right" tag="a" href="#!" color="primary">Apply</Badge>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                            {this.state.categories.includes('2') &&

                                <MDBDropdown>
                                    <MDBCol md="2">
                                        <MDBDropdownToggle color="primary">
                                            Mark
                                        </MDBDropdownToggle>
                                    </MDBCol>
                                    <MDBDropdownMenu basic>
                                        <div style={{ width: 500, height: 200 }}>
                                            <QueryCarMarksSelect
                                                handelMarksSelectChange={this.handelMarksSelectChange}
                                                categories={this.state.categories}
                                                selectedMarks={this.state.marks}
                                                multiple={true}
                                                search={true}
                                            />
                                        </div>
                                        <Badge className="float-left" tag="a" href="#!" color="secondary">Clean</Badge>
                                        <Badge className="float-right" tag="a" href="#!" color="primary">Apply</Badge>
                                    </MDBDropdownMenu>
                                </MDBDropdown>

                            }
                            {
                                this.state.marks.length > 0 &&
                                <MDBDropdown>
                                    <MDBCol md="2">
                                        <MDBDropdownToggle color="primary">
                                            Models
                                </MDBDropdownToggle>
                                    </MDBCol>
                                    <MDBDropdownMenu basic>
                                        <div style={{ width: 500, height: 200 }}>
                                            <MDBCol md="10">
                                                <QueryCarModelSelect
                                                    multiple={true}
                                                    search={true}
                                                    hideLabe={true}
                                                    categories={this.state.categories}
                                                    handelModelsSelectChange={this.handelModelsSelectChange}
                                                    selectedMarks={this.state.marks}
                                                    selectedModels={this.state.models}
                                                    lng={lng}
                                                />
                                            </MDBCol>
                                        </div>
                                        <Badge className="float-left" tag="a" href="#!" color="secondary">Clean</Badge>
                                        <Badge className="float-right" tag="a" href="#!" color="primary">Apply</Badge>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            }

                            <MDBDropdown>
                                <MDBCol md="2">
                                    <MDBDropdownToggle color="primary">
                                        Location
                            </MDBDropdownToggle>
                                </MDBCol>
                                <MDBDropdownMenu basic>
                                    <div style={{ width: 500, height: 200 }}>
                                        <MDBCol md="10">
                                            <MDBSelect
                                                multiple
                                                color="primary"
                                                options={this.state.typeOptions}
                                                selected="Choose your option"
                                            />
                                        </MDBCol>
                                    </div>
                                    <Badge className="float-left" tag="a" href="#!" color="secondary">Clean</Badge>
                                    <Badge className="float-right" tag="a" href="#!" color="primary">Apply</Badge>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </FormInline>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Search;