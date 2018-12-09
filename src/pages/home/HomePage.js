import React, { Fragment } from "react";

import "./HomePage.css";
import {
  EdgeHeader,
  FreeBird,
  Col,
  Row,
  CardBody
} from "mdbreact";
import MultiCarousel from '../../components/MultiCarousel';
import { translate, Trans } from 'react-i18next';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: 'en'
    };
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <EdgeHeader color="indigo darken-3" />
        <FreeBird>
          <Row>
            <Col
              md="10"
              className="mx-auto float-none white z-depth-1 py-2 px-2"
            >
              <CardBody>
                <h2 className="h2-responsive mb-4">
                  <strong>{t('home.title')}</strong>
                </h2>
                <Trans i18nKey="home.description.part1">
                  To get started, edit <code>src/App.js</code> and save to reload.
                 </Trans>
                <p className="pb-4">
                  {t('home.description.part2')}
                </p>
              </CardBody>
            </Col>
          </Row>
        </FreeBird>
        <MultiCarousel />
      </div>

    );
  }
}
export default translate('translations')(HomePage);
