import React, { Component } from 'react';
import { Container, Collapse, Card, CardBody, CollapseHeader, CardTitle, Table, TableBody, MDBRow, MDBInput, MDBCol, MDBBtn } from 'mdbreact';
import SummaryRow from './SummaryRow';
import { translate } from 'react-i18next';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: '',
      saving: false,
      passDto: {
        password: "",
        confirmPassword: ""
      }
    };
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));

  handleInputChange = (event) => {
    const field = event.target.name;
    let dto = this.state.passDto;
    dto[field] = event.target.value;
    this.setState({ passDto: Object.assign({}, dto) });
  }

  render() {
    const { announcement, t } = this.props;
    const { collapseID } = this.state;
    return (
      <Container className="md-accordion mt-5">
        <Card className="mt-3">
          <CollapseHeader onClick={this.toggleCollapse('collapse1')}>View summary
              <i className={collapseID === 'collapse1' ? 'fa fa-angle-down rotate-icon' : 'fa fa-angle-down'}></i>
          </CollapseHeader>
          <Collapse id="collapse1" isOpen={collapseID}>
            <CardBody>
              <Table bordered>
                <TableBody>
                  {announcement.category &&
                    <tr>
                      <SummaryRow title={t('edit.form.category.label')} value={t('edit.form.categories.' + announcement.category.toString())} />
                    </tr>
                  }
                  {announcement.type &&
                    <tr>
                      <SummaryRow title={t('edit.form.type.title')} value={t('edit.form.types.' + announcement.type.toString())} />
                    </tr>
                  }
                  {announcement.title &&
                    <tr>
                      <SummaryRow title={t('edit.form.title.label')} value={announcement.title} />
                    </tr>
                  }
                  {announcement.description &&
                    <tr>
                      <SummaryRow title={t('edit.form.description.label')} value={announcement.description} />
                    </tr>
                  }
                  {announcement.amount &&
                    <tr>
                      <SummaryRow title="Amount" value={announcement.amount} />
                    </tr>
                  }
                  {announcement.criteria.mark &&
                    <tr>
                      <SummaryRow title="Mark" value={announcement.criteria.mark} />
                    </tr>
                  }
                  {announcement.criteria.model &&
                    <tr>
                      <SummaryRow title="Model" value={announcement.criteria.model} />
                    </tr>
                  }
                  {announcement.criteria.yearOfModel &&
                    <tr>
                      <SummaryRow title="Year of Model" value={announcement.criteria.yearOfModel} />
                    </tr>
                  }
                  {announcement.criteria.typeOfFuel &&
                    <tr>
                      <SummaryRow title="Type of fuel" value={announcement.criteria.typeOfFuel} />
                    </tr>
                  }
                  {announcement.criteria.typeOfGearBox &&
                    <tr>
                      <SummaryRow title="Type of gear box" value={announcement.criteria.typeOfGearBox} />
                    </tr>
                  }

                  {announcement.criteria.energyClassification &&
                    <tr>
                      <SummaryRow title="Energy classification" value={announcement.criteria.energyClassification} />
                    </tr>
                  }
                  {announcement.criteria.ges &&
                    <tr>
                      <SummaryRow title="GES" value={announcement.criteria.ges} />
                    </tr>
                  }
                  {announcement.criteria.cylinder &&
                    <tr>
                      <SummaryRow title="Cylinder" value={announcement.criteria.cylinder} />
                    </tr>
                  }
                  {announcement.criteria.mileage &&
                    <tr>
                      <SummaryRow title="Mileage" value={announcement.criteria.mileage} />
                    </tr>
                  }
                  {announcement.criteria.sizeOfSurface &&
                    <tr>
                      <SummaryRow title="Size of surface" value={announcement.criteria.sizeOfSurface} />
                    </tr>
                  }
                  {announcement.criteria.immovableType &&
                    <tr>
                      <SummaryRow title="Immovable type" value={announcement.criteria.immovableType} />
                    </tr>
                  }
                  {announcement.criteria.isEquiped &&
                    <tr>
                      <SummaryRow title="Equiped" value={announcement.criteria.isEquiped} />
                    </tr>
                  }
                  {announcement.criteria.numberOfRooms &&
                    <tr>
                      <SummaryRow title="Number of rooms" value={announcement.criteria.numberOfRooms} />
                    </tr>
                  }
                  {announcement.criteria.numberOfPeople &&
                    <tr>
                      <SummaryRow title="Number of people" value={announcement.criteria.numberOfPeople} />
                    </tr>
                  }
                  {announcement.criteria.numberOfVacationRooms &&
                    <tr>
                      <SummaryRow title="Number of vacation rooms" value={announcement.criteria.numberOfVacationRooms} />
                    </tr>
                  }
                  {announcement.criteria.hasSwimingPool &&
                    <tr>
                      <SummaryRow title="Has swiming pool" value={announcement.criteria.hasSwimingPool} />
                    </tr>
                  }
                  <tr>
                    <SummaryRow title="Location" value={announcement.location.numberOfStreet + " " +
                      announcement.location.streetName + " " + announcement.location.city + " " + announcement.location.zipCode
                    } />
                  </tr>
                  {announcement.location.address &&
                    <tr>
                      <SummaryRow title="Address" value={announcement.location.address} />
                    </tr>
                  }
                  {announcement.location.country &&
                    <tr>
                      <SummaryRow title="Country" value={announcement.location.country} />
                    </tr>
                  }
                </TableBody>
              </Table>
            </CardBody>
          </Collapse>
        </Card>
        <Card className="mt-3">
          <CardBody>
            <CardTitle>
              Create your password
          </CardTitle>
            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  type="password"
                  label="Password"
                  onBlur={this.handleInputChange}
                  name="password" />
              </MDBCol>
              <MDBCol md="6">
                <MDBInput
                  type="password"
                  label="Confirme your password"
                  onBlur={this.handleInputChange}
                  name="confirmPassword" />
              </MDBCol>
            </MDBRow>
          </CardBody>
        </Card>
        <div className="text-center">
          <MDBBtn
            color="default"
            disabled={this.state.saving}
            onClick={this.onSave}
          >Edit</MDBBtn>
          <MDBBtn
            color="primary"
            disabled={this.state.saving}
            onClick={this.onSave}
          >{this.state.saving ? "Saving..." : "Save"}</MDBBtn>
        </div>
      </Container>
    );
  }
}

export default translate('translations')(Summary);