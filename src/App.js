import React, { Component } from 'react';
import Europe from './Europe'
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import cities from './mock';
import am4geodata_usaHigh from "@amcharts/amcharts4-geodata/usaHigh";
import Pop from './Pop'


class App extends Component {
  state = {
    animateNumberOptions: {
      duration: 2000,
      easing: 'easeInQuad',
      formatValue(value) {
        let number = value.toFixed(0);
        let numberAsArrayWithSapces = [];
        while (number >= 1) {
          numberAsArrayWithSapces.unshift(number % 1000);
          number = (number/1000).toFixed();
        }
        return numberAsArrayWithSapces.join(' ');
      }
    }
  }

  mapRef = React.createRef();

  componentDidMount() {
    let map = am4core.create("map", am4maps.MapChart);
    map.geodata = am4geodata_usaHigh;
    map.projection = new am4maps.projections.AlbersUsa();
    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    map.homeZoomLevel = 1.2;
    map.zoomControl = new am4maps.ZoomControl();
    map.zoomControl.align = 'left';
    map.zoomControl.valign = 'bottom';
    map.zoomControl.dy = -20;
    map.zoomControl.minusButton.background.fill = am4core.color("#fff");
    map.zoomControl.minusButton.background.stroke = am4core.color("#ccc");
    map.zoomControl.minusButton.label.fontWeight = 600;
    map.zoomControl.minusButton.label.fontSize = 16;
    map.zoomControl.plusButton.background.fill = am4core.color("#fff");
    map.zoomControl.plusButton.background.stroke = am4core.color("#ccc");
    map.zoomControl.plusButton.label.fontWeight = 600;
    map.zoomControl.plusButton.label.fontSize = 16;
    let plusButtonHoverState = map.zoomControl.plusButton.background.states.create("hover");
    plusButtonHoverState.properties.fill = am4core.color("#e9ecef");
    let minusButtonHoverState = map.zoomControl.minusButton.background.states.create("hover");
    minusButtonHoverState.properties.fill = am4core.color("#e9ecef");
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#e5e7f1");
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#e9ebf6");
    let citySeries = map.series.push(new am4maps.MapImageSeries());
    citySeries.data = cities;
    citySeries.dataFields.value = "size";
    let city = citySeries.mapImages.template;
    city.nonScaling = true;
    city.propertyFields.latitude = "latitude";
    city.propertyFields.longitude = "longitude";
    let circle = city.createChild(am4core.Circle);
    circle.fill = am4core.color("#ffc247");
    circle.stroke = am4core.color("#ffffff");
    circle.strokeWidth = 0;
    let circleHoverState = circle.states.create("hover");
    circleHoverState.properties.strokeWidth = 1;
    circle.tooltipText = '{tooltip}';
    circle.propertyFields.radius = 'size';
    this.map = map;
  
  }

  componentWillUnmount() {
    if(this.map) {
      this.map.dispose();
    }
  }

  render() {
    return (
      <div>
        <div id="map" style={{height: '500px'}}></div>
        <Europe/>
        <Pop/>
      </div>
    );
  }
}

export default App;