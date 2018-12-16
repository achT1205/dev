import React, { Component } from "react";
import {
    MDBCol,
    MDBSelect,
} from "mdbreact";
import { translate } from 'react-i18next';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as vehiculActions from "../../actions/vehiculActions";
import { compose } from "recompose";


class QueryCarModelSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelOptions: [],
            marks: this.props.marks
        };
    }
    componentDidMount() {
        const { t,
            selectedMarks,
            selectedModels
        } = this.props;
        this.setState({ modelOptions: [] });
        let marks = [];
        selectedMarks.forEach((sm) => {
            marks.push(this.state.marks.find(m => m.mark === sm));
        })
        if (marks) {
            this.setState({ modelOptions: [] });
            this.formatModelOptions(marks, selectedModels, t);
        }
    }

    formatModelOptions(selectedMarks, selectedModels, t) {
        if (selectedMarks && selectedModels) {
            this.setState((prevState) => {
                let prevOptions = [...prevState.modelOptions];
                selectedMarks.forEach((mark) => {
                    mark.models.forEach((model) => {
                        let option = {
                            checked: selectedModels.includes(model.model) ? true : false,
                            disabled: false,
                            icon: null,
                            value: model
                        };
                        prevOptions.push(option);
                    });
                });
                return { modelOptions: prevOptions };
            });
        } else {
            this.setState({
                modelOptions: [{
                    checked: true,
                    disabled: false,
                    icon: null,
                    value: t('edit.form.category.selected')
                }]
            });
        }
    }

    render() {
        const {
            t,
            categories,
            handelModelsSelectChange,
            multiple,
            search,
            hideLabe } = this.props;
        return (
            <div>
                {(categories.includes('2') || categories.includes('3')
                    || categories.includes('4') || categories.includes('5')) &&
                    <div>
                        <MDBSelect getValue={handelModelsSelectChange}
                            color="primary"
                            multiple={multiple}
                            search={search}
                            options={this.state.modelOptions}
                            selected={t('edit.form.labels.selectDefault')}
                        />
                        {!hideLabe && <label>{t('edit.form.labels.model')}</label>}
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
)(QueryCarModelSelect);