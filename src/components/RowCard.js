import React from "react";
import { MDBCard, MDBCardImage, MDBCardBody,
  MDBCardTitle,MDBCardText, MDBCardFooter,MDBTooltip
} from "mdbreact";
import createHistory from 'history/createBrowserHistory';
import { translate } from 'react-i18next';
const history = createHistory({forceRefresh: true})

const handleClick = (id) =>{
  history.push(`/details/${id}`);
};

const RowCard = ( props) => {
  const {announcement , t} = props;
  return (
    <MDBCard narrow ecommerce className="mb-2" onClick={()=>handleClick(announcement.id)} >
    <MDBCardImage
      cascade
      top
      src={announcement.mainPicture}
      alt={announcement.title}
    />
    <MDBCardBody cascade>
      <a href="" className="text-muted">
        <h5>{t('edit.form.categories.'+announcement.category.toString())}</h5>
      </a>
      <MDBCardTitle>
        <strong>
          <a href="">{announcement.title}</a>
        </strong>
      </MDBCardTitle>
      <MDBCardText>
      {announcement.shortDescription}
      </MDBCardText>
      <MDBCardFooter className="px-1">
        <span className="float-left">{announcement.amount}</span>
        <span className="float-right">
          <MDBTooltip
            placement="top"
            tag="a"
            component="i"
            componentClass="fa fa-eye grey-text ml-3"
            tooltipContent="Quick look"
          />
          <MDBTooltip
            placement="top"
            tag="a"
            component="i"
            componentClass="fa fa-heart grey-text ml-3"
            tooltipContent="Add to favoritlist"
          />
        </span>
      </MDBCardFooter>
    </MDBCardBody>
  </MDBCard>
  );
}
export default translate('translations')(RowCard);
