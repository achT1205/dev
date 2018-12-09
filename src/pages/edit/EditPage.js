import React, { Component } from 'react';
import './EditPage.css'
import {
    Container, MDBRow
} from "mdbreact";
import { translate } from 'react-i18next';
import EditFrom from '../../components/EditFrom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as announcementsActions from "../../actions/announcementsActions";
import { compose } from "recompose";


class EditPage extends Component {
    render() {
        const { t } = this.props;
        return (
            <div>
                <Container>
                    <MDBRow>
                        {!this.props.match.params.id &&
                            <h2 className="form-title">{t('edit.title1')}</h2>
                        }
                        {this.props.match.params.id &&
                            <h2 className="form-title">{t('edit.title2')}</h2>
                        }

                    </MDBRow>
                    <EditFrom announcementId={this.props.announcementId} />
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {

    let announcementId = ownProps.match.params.id;
    return {
        announcementId: announcementId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, announcementsActions), dispatch)
    };
}

export default compose(
    translate('translations'),
    connect(mapStateToProps, mapDispatchToProps)
)(EditPage);
