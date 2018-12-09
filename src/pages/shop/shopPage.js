import React from "react";

import "./shopPage.css";

import {
  Container
} from "mdbreact";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as announcementsActions from "../../actions/announcementsActions";
import ListRow from '../../components/ListRow';


class shopPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      offers: Object.assign({}, this.props.offers),
    };
  }

  componentWillMount() {
    this.props.actions
    .loadAnnouncements(1)
    .then((offers) => this.setState({ offers: Object.assign({}, offers) }))
    .catch(error => {
       console.log(error)
    });
  }

  render() {
    const { offers } = this.props;
    const length = offers.length;
    return (
      <div>
        <Container>
          {length >= 0 && <ListRow announcements={offers.slice(0, 3)} />}
          {length >3 && <ListRow announcements={offers.slice(3, 6)} />}
          {length > 6 && <ListRow announcements={offers.slice(6, 9)} />}
          {length > 9 && <ListRow announcements={offers.slice(9, 12)} />}
        </Container>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    offers: state.announcements
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
)(shopPage);
