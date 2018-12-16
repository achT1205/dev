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

class QueryCarMarksSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markOptions: [],
            marks: this.props.marks
        };
    }
    componentDidMount() {
        const {
            selectedMarks
        } = this.props;
        let ops = getCarMarksOptions();
        this.setState({ markOptions: ops });
        this.formatMarkOptions(selectedMarks);
    }

    formatMarkOptions(selectedMarks) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.markOptions];
            prevOptions.forEach((op) => {
                let mark = this.state.marks.find(m => m.mark === op.value);
                    op.icon = !mark.shortName ? defaultIconUrl : iconUrlBabe + mark.shortName + extension;
                if (selectedMarks && selectedMarks.length > 0 && selectedMarks.includes(op.value)) {
                    op.checked = true;
                }
            });
            return { markOptions: prevOptions };
        })
    }
  
    render() {
        const {
            t,
            categories,
            handelMarksSelectChange,
            multiple,
            search,
            hideLabe
        } = this.props;
        return (
            <div>
                {(categories.includes('2') || categories.includes('3')
                    || categories.includes('4') || categories.includes('5')) &&
                    <div>
                        <MDBSelect getValue={handelMarksSelectChange}
                            color="primary"
                            multiple={multiple}
                            search={search}
                            options={this.state.markOptions}
                            selected={t('edit.form.labels.selectDefault')}
                        />
                        {!hideLabe && <label>{t('edit.form.labels.mark')}</label>}
                    </div>
                }
            </div>
        );

    }
}

function mapStateToProps(state) {
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
)(QueryCarMarksSelect);