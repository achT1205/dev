import React from "react";
import { MDBInput } from "mdbreact";
import { translate } from 'react-i18next';

const TextImput = (props) => {
  const { type, handleInputChange, t, category, name, value } = props;
  let title = t('edit.form.title.label');
  if (category === "1") {
    title = t('edit.form.category.categories.job.subtitle');
  }
  return (
    <div>
      <MDBInput value={value} label={title} type={type} name={name} onChange={handleInputChange} />
    </div>
  );
}

export default translate('translations')(TextImput);

