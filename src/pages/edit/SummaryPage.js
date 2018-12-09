import React, { Component } from 'react';
import {
    Container, MDBRow, MDBContainer, MDBCol
} from "mdbreact";
import { translate } from 'react-i18next';
import Summary from '../../components/Summary';
import * as announcementsActions from "../../actions/announcementsActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "recompose";

class SummaryPage extends Component {

    componentWillMount() {
        this.props.actions
            .loadAnnouncement(this.props.announcementId)
            .then(() => { });
    }

    render() {
        const { t } = this.props;
        return (
            <MDBContainer>
                <MDBRow className="mb-4">
                    <MDBCol sm="12">
                        {this.props.announcement.id &&
                            <Container>
                                <Summary announcement={this.props.announcement} />
                            </Container>
                        }
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const announcementId = ownProps.match.params.id; // from the path `/course/:id`
    return {
        announcement: state.announcements,
        announcementId: announcementId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(announcementsActions, dispatch)
    };
};

export default compose(
    translate('translations'),
    connect(mapStateToProps, mapDispatchToProps)
)(SummaryPage);