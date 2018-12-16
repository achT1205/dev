import React, { Component } from "react";
import {
  MDBSelect
} from "mdbreact";
import { translate } from 'react-i18next';
import getCategoryOptions from './categoryOptions'; 
import './SelectInput.css';

class QueryCategoriesSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
  }

  componentDidMount() {
    const { t, selectedValues } = this.props
    let ops = getCategoryOptions(t);
    this.setState({ options: ops })
    this.formatOptions(t, selectedValues)
  }

  formatOptions(t, selectedValues) {
    this.setState(prevState => {
      let prevOptions = [...prevState.options];
      selectedValues.forEach((val) => {
        prevOptions.forEach((op) => {
          if (op.value === t('edit.form.categories.' + val)) {
            op.checked = true;
          }
        });
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
export default translate('translations')(QueryCategoriesSelect);