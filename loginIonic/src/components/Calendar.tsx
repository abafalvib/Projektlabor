import {Inject, ScheduleComponent,
        Day, Week, WorkWeek, Month, Agenda,
        EventSettingsModel} from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import React, { useEffect, useState } from 'react';
import { IonApp, IonButton } from '@ionic/react';

import fire from '../fire';


var db = fire.firestore();

var scheduleObj: ScheduleComponent;

var localData: EventSettingsModel = {
  allowDeleting: true,
  allowEditing: true,
  dataSource: [{
    Summary: 'KEKW',
    End: new Date(2020,10,25,6,30),
    Start: new Date(2020,10,25,4,0),
    IsAllDay: true
  },
  {
      End: new Date(2020,10,27,6,30),
      Start: new Date(2020,10,26,4,0)
  }],
  fields: {
    subject: { name: 'Summary', default: 'Nincs megadva.'},
    startTime: { name: 'Start'},
    endTime: { name: 'End'}
  }
};

const addData = () => {
    let eventData:{[key: string]: Object} = {
      Summary: 'XD',
      End: new Date(2020,10,29,6,30),
      Start: new Date(2020,10,29,4,0),
      IsAllDay: true
    };
    scheduleObj.addEvent(eventData);
}

const myCalendar: React.FC = () => (
  <IonApp>
    <ScheduleComponent ref={schedule => scheduleObj = schedule as ScheduleComponent}
    currentView='Month' eventSettings={localData}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      <IonButton onClick={(e) => addData()}>Add Event</IonButton>
    </ScheduleComponent>
  </IonApp>
);

export default myCalendar;
