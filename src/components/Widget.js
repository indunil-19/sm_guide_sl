import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsE,
  CWidgetStatsF,CWidgetStatsD
} from '@coreui/react'

import { CChartBar, CChartLine } from '@coreui/react-chartjs';


export default function Widgets() {
    return (
        <div>
            <CRow>
  <CCol xs={6}>
    <CWidgetStatsB
      className="mb-3"
      progress={{ color: 'success', value: 75 }}
      text="Widget helper text"
      title="Percentage of Admin online"
      value="89.9%"
    />
  </CCol>
  <CCol xs={6}>
    <CWidgetStatsB
      className="mb-3"
      color="primary"
      inverse
      progress={{ value: 75 }}
      text="Widget helper text"
      title="Widget title"
      value="89.9%"
    />
  </CCol>
</CRow>
        </div>
    )
}

 
 