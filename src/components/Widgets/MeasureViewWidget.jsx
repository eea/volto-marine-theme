import React from 'react';
import { fields } from '@eeacms/volto-marine-theme/constants/measureFields';
import String from './String';
import './measure.css';

const MeasureView = (props) => {
  const { origin } = props?.content;

  //conditional fields shown in view based on origin of measure
  const conditions = {
    'WFD (Directive 2000/60/EC)': [
      'nature_of_physical_modification',
      'effect_on_hydromorphology',
      'ecological_impacts',
    ],
    'MSFD (Directive 2008/56/EC)': [
      'links_to_existing_policies',
      'ktms_it_links_to',
      'relevant_targets',
      'relevant_features_from_msfd_annex_iii',
      'msfd_spatial_scope',
    ],
    'HD (Directive 92/43/EEC)': [
      'measure_purpose',
      'measure_location',
      'measure_response',
      'measure_additional_info',
      'pressure_type',
      'pressure_name',
      'ranking',
      'region',
    ],
    'BD (Directive 79/409/EEC)': [
      'measure_purpose',
      'measure_location',
      'measure_response',
      'measure_additional_info',
      'pressure_type',
      'pressure_name',
      'ranking',
      'region',
    ],
    'MSPD (Directive 2008/56/EC)': [
      'mspd_implementation_status',
      'shipping_tackled',
      'traffic_separation_scheme',
      'priority_areas',
      'approaching_areas',
      'precautionary_areas',
      'areas_to_be_avoided',
      'future_scenarios',
      'source',
      'authority',
      'general_view',
      'ports',
      'future_expectations',
      'safety_manner',
      'objective',
      'categories',
    ],
    Sectorial: ['source'],
  };

  // Fields that don't need to check the origin condition
  const unconditionalFields = fields.filter(
    (field) => !Object.values(conditions).flat().includes(field.field),
  );

  // Determine which fields to display in the "Further Information" section
  const getConditionalFields = () => {
    // If origin has no value, display all available fields
    if (!origin || origin.length === 0) {
      const fieldsNames = unconditionalFields.reduce(
        (acc, field) => [...acc, field.field],
        [],
      );
      return fields.filter((field) => !fieldsNames.includes(field.field));
    }

    // Filter fields based on origin(s)
    return fields.filter((field) => {
      for (let cond of origin) {
        if (conditions[cond]?.includes(field.field)) {
          return true;
        }
      }
      return false;
    });
  };

  const renderField = (field) => (
    <div className="measure-field">
      <div className="measure-field-label">{field.title}</div>
      <div className="measure-field-value">
        {props.content[field.field] ? (
          <String val={props?.content[field.field]} />
        ) : (
          'No value'
        )}
      </div>
      <div></div>
    </div>
  );

  return (
    <div id="page-document" className="view-view-spmeasure">
      <h1>
        <String val={props?.content?.title} />
      </h1>
      <div className="measure-form">
        {unconditionalFields.map(renderField)}

        {/* Further Information Section */}
        <div className="further-information-section">
          <h3>Further information</h3>
          {getConditionalFields().map(renderField)}
        </div>
      </div>
    </div>
  );
};

export default MeasureView;
