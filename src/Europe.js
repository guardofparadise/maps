import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import places from "./mock2";



class Europe extends Component {
  state = {

  }

  componentDidMount() {
    let map = am4core.create("chartdiv", am4maps.MapChart);
    map.geodata = am4geodata_worldLow;
    map.projection = new am4maps.projections.Miller();
    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.exclude = ["AQ"];
    map.zoomControl = new am4maps.ZoomControl();
    map.zoomControl.align = 'left';
    map.zoomControl.valign = 'top';
    map.zoomControl.dx = 35;
    map.zoomControl.dy = 120;
    map.zoomControl.minusButton.background.fill = am4core.color("#a3aeb7");
    map.zoomControl.plusButton.background.fill = am4core.color("#a3aeb7");
    let plusButtonHoverState = map.zoomControl.plusButton.background.states.create("hover");
    plusButtonHoverState.properties.fill = am4core.color("#798892");
    let minusButtonHoverState = map.zoomControl.minusButton.background.states.create("hover");
    minusButtonHoverState.properties.fill = am4core.color("#798892");
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#798892");
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#29323a");
    let placeSeries = map.series.push(new am4maps.MapImageSeries());
    let place = placeSeries.mapImages.template;
    place.nonScaling = true;
    place.propertyFields.latitude = "latitude";
    place.propertyFields.longitude = "longitude";
    let circle = place.createChild(am4core.Circle);
    circle.radius = 5;
    circle.fill = am4core.color("#f55d5d");
    circle.stroke = am4core.color("#ffffff");
    circle.strokeWidth = 2;
    placeSeries.data = places;
    circle.tooltipText = '{name}';
    this.map = map;
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" class="amchartsMap"></div>

    )
  }
}

export default Europe;