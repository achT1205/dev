import React from 'react';
import DetailsDesktop from '../../components/DetailsDesktop';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as announcementsActions from "../../actions/announcementsActions";
class DetailsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      announcement: {},
    };
  }

  componentWillMount() {
    this.props.actions
      .loadAnnouncement(this.props.announcementId)
      .then(() => { });
  }

  render() {
    return (
      <div>
        {this.props.announcement.id && <DetailsDesktop announcement={this.props.announcement} />}
      </div>
    );
  }
};


const mapStateToProps = (state, ownProps) => {
  const announcementId = ownProps.match.params.id; // from the path `/course/:id`
  let announcement = {};
  if (state.announcements && state.announcements[0] && state.announcements[0].id) {
    announcement = state.announcements[0];
  }
  return {
    announcement: announcement,
    announcementId: announcementId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(announcementsActions, dispatch)
  };
};

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailsPage);;
