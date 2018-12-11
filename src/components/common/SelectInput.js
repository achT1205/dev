import React, { Component } from "react";
import {
  MDBSelect
} from "mdbreact";
import { translate } from 'react-i18next';
import './SelectInput.css';

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
  }

  componentDidMount() {
    this.formatOptions(this.props.t, "0")
  }

  componentWillReceiveProps(nextProps) {
    const { t, selectedValue, lng, i18n } = nextProps;
    if (selectedValue !== this.props.selectedValue)
      this.setState((prevState) => {
        let prevOptions = [...prevState.options];
        let index = this.state.options.findIndex(op => op.value === t('edit.form.categories.' + selectedValue));
        if (prevOptions[index])
          prevOptions[index].checked = true;
        return { options: prevOptions };
      });
    if (lng !== this.props.lng) {
      i18n.changeLanguage(lng);
      this.setState({ options: [] });
      this.formatOptions(t, selectedValue)
    }
  }

  formatOptions(t, selectedValue) {
    this.setState(prevState => {

      let prevOptions = [...prevState.options];

      prevOptions.push({
        checked: false,
        disabled: true,
        icon: null,
        value: t('edit.form.category.categories.job.title')
      });
      prevOptions.push({
        checked: '1' === selectedValue ? true : false,
        disabled: false,
        icon: null,
        value: t('edit.form.categories.1')
      });

      prevOptions.push({
        checked: false,
        disabled: true,
        icon: null,
        value: t('edit.form.category.categories.vehicule.title')
      });

      for (let i = 2; i < 11; i++) {
        prevOptions.push({
          checked: i.toString() === selectedValue ? true : false,
          disabled: false,
          icon: null,
          value: t('edit.form.categories.' + i.toString())
        })
      };

      prevOptions.push({
        checked: false,
        disabled: true,
        icon: null,
        value: t('edit.form.category.categories.immovable.title')
      });

      for (let i = 11; i < 15; i++) {
        prevOptions.push({
          checked: i.toString() === selectedValue ? true : false,
          disabled: false,
          icon: null,
          value: t('edit.form.categories.' + i.toString())
        })
      };

      prevOptions.push({
        checked: false,
        disabled: true,
        icon: null,
        value: t('edit.form.category.categories.vacation.title')
      });

      for (let i = 15; i < 20; i++) {
        prevOptions.push({
          checked: i.toString() === selectedValue ? true : false,
          disabled: false,
          icon: null,
          value: t('edit.form.categories.' + i.toString())
        })
      };
      prevOptions.push({
        checked: false,
        disabled: true,
        icon: null,
        value: t('edit.form.category.categories.multimedia.title')
      });

      for (let i = 20; i < 24; i++) {
        prevOptions.push({
          checked: i.toString() === selectedValue ? true : false,
          disabled: false,
          icon: null,
          value: t('edit.form.categories.' + i.toString())
        })
      };
      prevOptions.push({
        checked: false,
        disabled: true,
        icon: null,
        value: t('edit.form.category.categories.house.title')
      });

      for (let i = 24; i < 37; i++) {
        prevOptions.push({
          checked: i.toString() === selectedValue ? true : false,
          disabled: false,
          icon: null,
          value: t('edit.form.categories.' + i.toString())
        })
      };
      prevOptions.push({
        checked: false,
        disabled: true,
        icon: null,
        value: t('edit.form.category.categories.hobbies.title')
      });
      for (let i = 37; i < 47; i++) {
        prevOptions.push({
          checked: i.toString() === selectedValue ? true : false,
          disabled: false,
          icon: null,
          value: t('edit.form.categories.' + i.toString())
        })
      };
      prevOptions.push({
        checked: false,
        disabled: true,
        icon: null,
        value: t('edit.form.category.categories.equipments.title')
      });
      for (let i = 47; i < 56; i++) {
        prevOptions.push({
          checked: i.toString() === selectedValue ? true : false,
          disabled: false,
          icon: null,
          value: t('edit.form.categories.' + i.toString())
        })
      };
      prevOptions.push({
        checked: false,
        disabled: true,
        icon: null,
        value: t('edit.form.category.categories.services.title')
      });
      for (let i = 56; i < 61; i++) {
        prevOptions.push({
          checked: i.toString() === selectedValue ? true : false,
          disabled: false,
          icon: null,
          value: t('edit.form.categories.' + i.toString())
        })
      };
      prevOptions.push({
        checked: false,
        disabled: true,
        icon: null,
        value: t('edit.form.category.categories.others.title')
      });
      prevOptions.push({
        checked: '61' === selectedValue ? true : false,
        disabled: false,
        icon: null,
        value: t('edit.form.categories.61')
      });

      return { options: prevOptions };

    });
  }

  render() {
    const { handelCategorySelectChange, t, } = this.props;
    return (
      <div>
        <MDBSelect getValue={handelCategorySelectChange}
          color="primary"
          search={true}
          options={this.state.options}
          selected={t('edit.form.labels.selectDefault')}
        />
        <label>
          {t('edit.form.category.label')}
        </label>
      </div>
    );
  }
}
export default translate('translations')(SelectInput);