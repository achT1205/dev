import React from "react";
import "./DemandePage.css";
import {
  Container
} from "mdbreact";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as announcementsActions from "../../actions/announcementsActions";
import ListRow from '../../components/ListRow';


class DemandePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      demandes: Object.assign({}, this.props.demandes),
    };
  }

  componentWillMount() {
    this.props.actions
    .loadAnnouncements(2)
    .then((demandes) => this.setState({ demandes: Object.assign({}, demandes) }))
    .catch(error => {
       console.log(error)
    });
  }

  render() {
    const { demandes } = this.props;
    const length = demandes.length;
    return (
      <div>
        <Container>
          {length >= 0 && <ListRow announcements={demandes.slice(0, 3)} />}
          {length >3 && <ListRow announcements={demandes.slice(3, 6)} />}
          {length > 6 && <ListRow announcements={demandes.slice(6, 9)} />}
          {length > 9 && <ListRow announcements={demandes.slice(9, 12)} />}
        </Container>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    demandes: state.announcements
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(announcementsActions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemandePage);

