import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


declare var ol: any;

@Component({
  selector: 'app-new-incident',
  templateUrl: 'new-incident.component.html',
})
export class NewIncidentComponent implements OnInit {
  latitude = -87.6298;
  longitude = 41.8781;

  map: any;

  data: any;

  public newIncidentForm: FormGroup;

  formDefinition = {
    TypeofServiceRequest: ['', Validators.required],
    StreetAddress: ['', Validators.required],
    ZIPCode: ['', Validators.required],
    Xcoordinate: [''],
    Ycoordinate: [''],
    Ward: ['', Validators.required],
    PoliceDistrict: ['', Validators.required],
    CommunityArea: ['', Validators.required],
    Latitude: ['', Validators.required],
    Longitude: ['', Validators.required],
    Location: ['']
  };

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.newIncidentForm = this.fb.group(this.formDefinition);

    const mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      // className: 'custom-mouse-position',
      // target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });

    // const markerStyle = new ol.style.Style({
    //   image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    //     anchor: [0.5, 46],
    //     anchorXUnits: 'fraction',
    //     anchorYUnits: 'pixels',
    //     opacity: 0.75,
    //     src: 'https://openlayers.org/en/v4.6.4/examples/data/icon.png'
    //   }))
    // });

    const markerSource = new ol.source.Vector();

    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
          source: markerSource,
          // style: markerStyle,
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.latitude, this.longitude]),
        zoom: 12
      })
    });

    function addMarker(lon, lat) {
      // const iconFeatures = [];
      const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326',
          'EPSG:3857')),
        // name: 'Null Island',
        // population: 4000,
        // rainfall: 500
      });
      markerSource.addFeature(iconFeature);
    }

    this.data = this.map.on('click', function (args) {
      // console.log(args.coordinate);
      const lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);

      markerSource.clear();

      const lon = lonlat[0];
      const lat = lonlat[1];
      // alert(`lat: ${lat} long: ${lon}`);
      (<HTMLInputElement>document.getElementById('Longitude')).value = lon;
      (<HTMLInputElement>document.getElementById('Latitude')).value = lat;

      addMarker(lon, lat);
      return lonlat;
    });
  }

  submitIncident() {
    console.log(this.data);
  }

  setCenter() {
    const view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(12);
  }
}
