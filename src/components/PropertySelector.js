import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';

import { IonButtons, IonItem, IonSelectOption, IonSelect, isPlatform } from '@ionic/react';

const PropertySelector = () => {
  const { properties, setProperties, showSearchBar, setPropertiesMaxVals } = useContext(Context);
  var maxVals = [];

  useEffect(() => {
    properties.map(properties => {
      switch (properties) {
        case 'Atomic Mass':
          maxVals = [...maxVals, 300];
          break;

        case 'Density':
          maxVals = [...maxVals, 23];
          break;

        case 'Radius':
          maxVals = [...maxVals, 3.8];
          break;

        case 'Electronegativity':
          maxVals = [...maxVals, 4.8];
          break;

        case 'Electron Affinity':
          maxVals = [...maxVals, 350];
          break;

        case 'Boil Temperature':
          maxVals = [...maxVals, 5200];
          break;

        case 'Melt Temperature':
          maxVals = [...maxVals, 3800];
          break;
      }
    });
    setPropertiesMaxVals(maxVals);
  }, [properties]);

  const addOrDelete = (property) => {
    if(properties.includes(property)){
      const index = properties.indexOf(property)
      // properties.splice(index, 1);
      properties[index] = ""
    } else {
      setProperties([...properties, property])
    }
  }

  return (
    <>
      {isPlatform('mobile') && showSearchBar == true ? (
        ''
      ) : (
        <IonButtons slot="start">
          <IonItem lines="none" style={{ maxWidth: 350 }}>
            <IonSelect
              mode="ios"
              interfaceOptions={{
                header: 'Properties',
                backdropDismiss: false
              }}
              value={properties}
              onIonChange={e => setProperties(e.detail.value)}
              interface="popover"
              multiple={true}
              
            >
              <IonSelectOption value="Atomic Mass">Atomic Mass</IonSelectOption>
              <IonSelectOption value="Density">Density</IonSelectOption>
              <IonSelectOption value="Electronegativity">Electronegativity</IonSelectOption>
              <IonSelectOption value="Electron Affinity">Electron Affinity</IonSelectOption>
              <IonSelectOption value="Radius">Radius</IonSelectOption>
              <IonSelectOption value="Boil Temperature">Boil Temperature</IonSelectOption>
              <IonSelectOption value="Melt Temperature">Melt Temperature</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonButtons>
      )}
    </>
    // <IonButton
    //     expand="block"
    //   onClick={() =>
    //     present({
    //       buttons: [
    //         {
    //           text: 'Cancel',
    //         },
    //         {
    //           text: 'Confirm',
    //           handler: selected => {
    //             setProperties(selected.properties.value);
    //           },
    //         },
    //       ],
    //       columns: [
    //         {
    //           name: 'properties',
    //           options: [
    //             { text: 'Atomic Mass', value: 'Atomic Mass' },
    //             { text: 'Density', value: 'Density' },
    //             { text: 'Electronegativity', value: 'Electronegativity' },
    //             { text: 'Boil Temperature', value: 'Boil Temperature' },
    //             { text: 'Melt Temperature', value: 'Melt Temperature' },
    //           ],
    //         },
    //       ],
    //     })
    //   }
    // >
    //   {properties}
    // </IonButton>
  );
};

export default PropertySelector;


