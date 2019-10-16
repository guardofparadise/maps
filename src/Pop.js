import React, { Component } from 'react';
import fakeWorldData from './mapData';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

class Pop extends Component {
  state = {
    activeYear: 2012,
  }

  componentDidMount() {
    let map = am4core.create("pop", am4maps.MapChart);
    map.geodata = am4geodata_worldLow;
    map.projection = new am4maps.projections.Miller();
    map.homeZoomLevel = 6;
    map.homeGeoPoint = {
      longitude: 8.863224,
      latitude: 39.599254
    };
    this.polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    this.polygonSeries.useGeodata = true;
    this.polygonSeries.exclude = ["AQ"];
    this.polygonSeries.data = fakeWorldData[this.state.activeYear].areas;
    this.polygonSeries.tooltip.background.fill = am4core.color("#fff");
    this.polygonSeries.tooltip.getFillFromObject = false;
    this.polygonSeries.tooltip.label.fill = am4core.color("#495057");
    this.polygonSeries.tooltip.autoTextColor = false;
    map.zoomControl = new am4maps.ZoomControl();
    map.zoomControl.align = 'left';
    map.zoomControl.valign = 'bottom';
    map.zoomControl.dx = 10;
    map.zoomControl.dy = -30;
    map.zoomControl.layout = 'horizontal';
    map.zoomControl.minusButton.background.fill = am4core.color("#fff");
    map.zoomControl.plusButton.background.fill = am4core.color("#fff");
    map.zoomControl.minusButton.background.stroke = am4core.color("#ccc");
    map.zoomControl.plusButton.background.stroke = am4core.color("#ccc");
    map.zoomControl.plusButton.background.cornerRadius(16,16,16,16);
    map.zoomControl.minusButton.background.cornerRadius(16,16,16,16);
    map.zoomControl.plusButton.dx = 5;
    let plusButtonHoverState = map.zoomControl.plusButton.background.states.create("hover");
    plusButtonHoverState.properties.fill = am4core.color("#ccc");
    let minusButtonHoverState = map.zoomControl.minusButton.background.states.create("hover");
    minusButtonHoverState.properties.fill = am4core.color("#ccc");
    let polygonTemplate = this.polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipHTML = "{tooltip}";
    polygonTemplate.fill = am4core.color("#eee");
    polygonTemplate.stroke = am4core.color("#666");
    polygonTemplate.strokeWidth = 0.1;
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#999");
    this.polygonSeries.heatRules.push({
      "property": "fill",
      "target": polygonTemplate,
      "min": am4core.color("#eee"),
      "max": am4core.color("#aaa")
    });
    this.map = map;
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }

  render() {
    return (
      <div class="map" id="pop" ref="map"></div>  
    )
  }
}
export default Pop;
 
  // methods: {
  //   changeYear(year) {
  //     Vue.set(this, 'activeYear', year);
  //     this.polygonSeries.data = fakeWorldData[year].areas;
  //   },
  
  
