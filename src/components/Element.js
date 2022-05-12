import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../Context';

//Your JS-based app needs to make two requests to an external API to fetch two sets of data: customers and orders. Due to how you'll need to use this data, a good strategy is to match and merge the two lists into one: a list of customers where each item can have a nested list of orders. Build a denormalize function which takes in two arrays and the reference ID (foreign key), the first one being the primary type (in this case denormalize(customers, orders, 'customerId')), and returns a new array with the nested structure described above. You can check the test file (with a couple of example cases) in the filesystem tab to your left.

function denormalize({ primary, related, relatedName, referenceId }) {
  return primary.map(primaryItem => {
    const relatedItems = related.filter(relatedItem => {
      return relatedItem[relatedName] === primaryItem[referenceId];
    });
    return { ...primaryItem, [relatedName]: relatedItems };
  });
}
const Element = props => {
  const {
    symbol,
    name,
    atomic_mass,
    atomic_number,
    category,
    electronegativity,
    density,
    electron_affinity,
    boil_temperature,
    melt_temperature,
    radius,
    hardness,
    electrical_resistivity,
    thermal_conductivity,
    superconduction_temperature,
    bulk_modulus,
    brinell_hardness
  } = props;

  const { properties, searchText, setSearchText, setElementModal, propertiesMaxVals } = useContext(
    Context
  );
  const [mouseOver, setMouseOver] = useState(false);

  const getGreen = () => {
    var redPercentage = 0;
    var totalPercentages = 0;

    properties.map((properties, i) => {
      switch (properties) {
        case 'Atomic Mass':
          totalPercentages = totalPercentages + atomic_mass / propertiesMaxVals[i];
          break;

        case 'Density':
          totalPercentages = totalPercentages + density / propertiesMaxVals[i];
          break;

        case 'Radius':
          totalPercentages = totalPercentages + radius / propertiesMaxVals[i];
          break;

        case 'Electronegativity':
          totalPercentages = totalPercentages + electronegativity / propertiesMaxVals[i];
          break;

        case 'Electron Affinity':
          totalPercentages = totalPercentages + electron_affinity / propertiesMaxVals[i];
          break;

        case 'Boil Temperature':
          totalPercentages = totalPercentages + boil_temperature / propertiesMaxVals[i];
          break;

        case 'Melt Temperature':
          totalPercentages = totalPercentages + melt_temperature / propertiesMaxVals[i];
          break;
      }
    });
    redPercentage = totalPercentages / properties.length;
    return (1 - redPercentage) * 255;
  };

  const isElementSearched = () => {
    if (searchText != '' && searchText != undefined && symbol && name) {
      if (
        symbol.toLowerCase().startsWith(searchText.toLowerCase()) ||
        name.toLowerCase().startsWith(searchText.toLowerCase())
      ) {
        if (properties == 'Atomic Mass') return 'ff';
        else return '1';
      } else {
        if (properties == 'Atomic Mass') return '30';
        else return '0.4';
      }
    } else {
      if (properties == 'Atomic Mass') {
        if (mouseOver) return 'ff';
        else return '50';
      } else return '1';
    }
  };

  return (
    <>
      <ElementWrapper
        category={category}
        propertiesMaxVals={propertiesMaxVals}
        green={getGreen()}
        properties={properties}
        electronegativity={electronegativity}
        electron_affinity={electron_affinity}
        density={density}
        boil_temperature={boil_temperature}
        melt_temperature={melt_temperature}
        radius={radius}
        opacity={isElementSearched()}
        onClick={() => setElementModal(props)}
        onMouseOver={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        <Row>
          <AtomicNumber>{atomic_number}</AtomicNumber>
          {/* SI ES PANTALLA MUY CHICA:  */}
          {window.screen.height < 670 && <Symbol>{symbol}</Symbol>}
        </Row>

        <Column>
          {/* SI ES PANTALLA GRANDE:  */}
          {window.screen.height > 671 && <Symbol>{symbol}</Symbol>}

          <Name>{name}</Name>

          <PropertyValue>
            {properties == 'Atomic Mass' && atomic_mass?.toFixed(4)}
            {properties == 'Density' && density?.toFixed(2)}
            {properties == 'Radius' && radius}
            {properties == 'Electron Affinity' && electron_affinity}
            {properties == 'Boil Temperature' && boil_temperature}
            {properties == 'Melt Temperature' && melt_temperature?.toFixed(2)}
            {properties == 'Electronegativity' && electronegativity}
          </PropertyValue>
        </Column>
      </ElementWrapper>
    </>
  );
};

export default Element;

const ElementWrapper = styled.div`
  height: 13%;
  width: 100%;
  margin-bottom: 10%;
  transition: 0.3s ease-in;
  cursor: pointer;
  background: ${props => {
    if (props.properties == 'Atomic Mass') {
      if (props.category == 'alkali metal') return `#ff0000${props.opacity}`;
      if (props.category == 'alkaline earth metal') return `#ff7700${props.opacity}`;
      if (props.category == 'transition metal') return `#ffff00${props.opacity}`;
      if (props.category == 'post-transition metal') return `#00ff00${props.opacity}`;
      if (props.category == 'metalloid') return `#00ffff${props.opacity}`;
      if (props.category == 'nonmetal') return `#6666ff${props.opacity}`;
      if (props.category == 'noble gas') return `#ff00ff${props.opacity}`;
      else return '#ddddddaa';
    } else {
      if (!props.category) return '#ddddddaa';
      else return `rgb(255, ${props.green}, 0 , ${props.opacity})`;
    }
  }};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Column = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const Row = styled.div`
  width: 70%;
  padding-left: 13%;
  padding-right: 13%;
  padding-top: 13%;
  height: 15%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AtomicNumber = styled.p`
  font-size: 1.5vh;
  /* font-size: 1.8vh; */
  font-size: 87%;
  font-weight: bold;
  /* height: 25px; */
  margin-right: auto;
`;

const Symbol = styled.p`
  /* font-size: 16px; */
  font-size: 2vh;
  font-weight: bold;
  margin: 0;
  display: flex;
  display: inline;
`;

const Name = styled.p`
  font-size: 10px;
  margin: 0;
`;

const PropertyValue = styled.p`
  font-size: 10px;
  margin: 0;
`;
