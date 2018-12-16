import React, { Component } from "react";
import {
  MDBSelect
} from "mdbreact";
import { translate } from 'react-i18next';
import getCategoryOptions from './categoryOptions';
import './SelectInput.css';

class CategorySelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
  }

  componentDidMount() {
    const { t, selectedValue } = this.props
    let ops = getCategoryOptions(t);
    this.setState({ options: ops })
    this.formatOptions(t, selectedValue)
  }

  componentWillReceiveProps(nextProps) {
    const { t, selectedValue, lng, i18n } = nextProps;
    if (lng !== this.props.lng) {
      i18n.changeLanguage(lng);
      let ops = getCategoryOptions(t);
      this.setState({ options: ops })
      this.formatOptions(t, selectedValue)
    }
  }

  formatOptions(t, selectedValue) {
    this.setState(prevState => {
      let prevOptions = [...prevState.options];
      prevOptions.forEach((op) => {
        if (op.value === t('edit.form.categories.' + selectedValue)) {
          op.checked = true;
        }
      });
      return { options: prevOptions };
    });
  }

  render() {
    const { handelCategorySelectChange, t, multiple, search, hideLabe } = this.props;
    return (
      <div>
        <MDBSelect getValue={handelCategorySelectChange}
          color="primary"
          multiple={multiple}
          search={search}
          options={this.state.options}
          selected={t('edit.form.labels.selectDefault')}
        />
        {!hideLabe && <label>
          {t('edit.form.category.label')}
        </label>
        }
      </div>
    );
  }
}
export default translate('translations')(CategorySelectInput);